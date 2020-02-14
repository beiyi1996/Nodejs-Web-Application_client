import React, { useState, useEffect, useCallback } from "react";
import productService from "../services/productService";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      margin: "0",
      padding: "0"
    },
    "*::-webkit-scrollbar": {
      width: "0em",
      height: "8px"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(155, 208, 208, .5)",
      outline: "1px solid slategrey",
      borderRadius: "15px"
    }
  },
  root: {
    position: "relative",
    height: "100vh",
    maxWidth: 600,
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    overflow: "hidden"
  },
  grid: {
    position: "relative",
    height: "100vh",
    maxWidth: 600
  },
  card: {
    width: "100%",
    marginTop: 10,
    position: "relative"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: "100vh",
    overflow: "scroll",
    paddingBottom: 130
    // marginLeft: -drawerWidth
  },
  orderDetail: {
    listStyleType: "circle",
    paddingLeft: 30,
    fontFamily: "Microsoft JhengHei"
  },
  orderContent: {
    marginTop: 15,
    marginBottom: 25,
    position: "relative",

    "&::after": {
      content: "''",
      width: "100%",
      position: "absolute",
      bottom: "-15px",
      border: "0.5px dashed #B8B9C3"
    }
  },
  orderTitle: {
    fontFamily: "Microsoft JhengHei"
  },
  featureBtn: {
    position: "absolute",
    top: 0,
    right: 0,

    "& > a": {
      "& > button": {
        minWidth: "auto",
        "& > span > svg": {
          color: "#7FABAB"
        }
      }
    },
    "& > button": {
      minWidth: "auto",
      lineHeight: "initial",

      "&:nth-child(2)": {
        color: "#E07A5F"
      }
    }
  },
  noOrder: {
    backgroundColor: "#F9F7ED",
    color: "#E07A5F",
    fontFamily: "Microsoft JhengHei",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
    padding: 10,
    wordBreak: "normal",
    marginTop: 20
  },
  footerDiv: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    "& > div": {
      position: "static"
    }
  }
}));

function Orders() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [isLogIn, setIsLogIn] = useState(true);
  const history = useHistory();

  const getRestaurant = async () => {
    let res = await productService.getAll();
    setrestaurant(res);
  };

  const getAllOrders = useCallback(async () => {
    const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    console.log("user", user);
    const res = await productService.getAllOrders(user.member);
    console.log("get all orders res", res);
    if (res.code === 200) {
      setIsLogIn(true);
      if (!restaurant) {
        getRestaurant();
      }
      const promise = res.orders.map(item => {
        return new Promise((resolve, reject) => {
          const formatDateTime = new Date(item.dateTime);
          const date = `${formatDateTime.getFullYear()} / ${formatDateTime.getMonth() +
            1} / ${formatDateTime.getDate()}`;
          const minutes =
            formatDateTime.getMinutes() > 9 ? formatDateTime.getMinutes() : `0${formatDateTime.getMinutes()}`;
          const time = `${formatDateTime.getHours()} : ${minutes}`;
          const createDateTime = new Date(item.create_time);
          const createDate = `${createDateTime.getFullYear()} / ${createDateTime.getMonth() +
            1} / ${createDateTime.getDate()}`;
          const createMinutes =
            createDateTime.getMinutes() > 9 ? createDateTime.getMinutes() : `0${createDateTime.getMinutes()}`;
          const createTime = `${createDateTime.getHours()} : ${createMinutes}`;
          const restaurantNamePromise = new Promise((resolve, reject) => {
            const restaurantNameResult = productService.getRestaurantName(item.restaurant_id);
            resolve(restaurantNameResult);
          });
          restaurantNamePromise.then(value => {
            console.log("order page getAllOrders restaurantNamePromise value", value.restaurantName);
            item.restaurantName = value.restaurantName;
            item.date = date;
            item.time = time;
            item.createDate = createDate;
            item.createTime = createTime;
            console.log("item", item);
            resolve(item);
          });
        });
      });

      Promise.all(promise).then(results => {
        console.log("orders promise results", results);
        setOrders(results);
      });
    } else {
      setIsLogIn(false);
      alert("請先登入, 即可查看訂單! 謝謝!");
      sessionStorage.clear();
      history.push("/login");
    }
  });

  useEffect(() => {
    console.log("Orders page useEffect is working!!");
    getAllOrders();
  }, []);

  const handleDeleteOrder = async order_ID => {
    console.log("handle delete order order_ID", order_ID);
    const deleteOrder = window.confirm("請問您確定要刪除此筆訂單嗎?");
    if (deleteOrder) {
      const deleteOrder = await productService.deleteOrderDetails(order_ID);
      console.log("deleteOrder", deleteOrder);
      if (deleteOrder.code === 400) {
        alert("您已超過最晚取消預約時間, 無法將您的訂單移除!");
      } else if (deleteOrder.code === 403) {
        alert("您已登入超過10分鐘, 系統為確保您的資料安全, 已將您登出!! 請您再次登入進行修改, 謝謝!");
        sessionStorage.clear();
        history.push("/login");
      } else {
        await getAllOrders();
        alert(`已將您的訂單編號為 (${order_ID}) 訂單刪除!`);
      }
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.grid}>
        <div>
          <CssBaseline />
          {isLogIn ? <Header /> : <></>}
          <main className={classes.content}>
            {orders.length !== 0 ? (
              orders.map(item => {
                return (
                  <Grid item xs={12} className={classes.orderContent} key={item.create_time}>
                    <Typography className={classes.orderTitle}>
                      <span>訂單編號 : </span>
                      <span>{item._id}</span>
                    </Typography>
                    <Typography className={classes.orderTitle}>
                      <span>成立訂單 : </span>
                      <span>
                        {item.createDate} - {item.createTime}
                      </span>
                    </Typography>
                    <Card className={classes.card}>
                      <ul className={classes.orderDetail}>
                        <li>
                          餐廳名稱 : <span>{item.restaurantName}</span>
                        </li>
                        <li>
                          日期 : <span>{item.date}</span>
                        </li>
                        <li>
                          時間 : <span>{item.time}</span>
                        </li>
                        <li>
                          人數 :{" "}
                          <span>
                            {item.adult} 大人 {item.children}小孩
                          </span>
                        </li>
                        <li>
                          備註 : <span>{item.notes}</span>
                        </li>
                      </ul>
                      <div className={classes.featureBtn}>
                        <Link to={`/orderdetails?order_ID=${item._id}`}>
                          <Button>
                            <CreateRoundedIcon />
                          </Button>
                        </Link>
                        <Button onClick={() => handleDeleteOrder(item._id)}>
                          <DeleteRoundedIcon />
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <div className={classes.noOrder}>
                還沒找到喜歡的餐廳嗎?? <br />
                快回首頁在搜尋一下吧!!
              </div>
            )}
          </main>
        </div>
        <div className={classes.footerDiv}>
          <Footer selectedValue={1} />
        </div>
      </Grid>
    </Container>
  );
}

export default Orders;
