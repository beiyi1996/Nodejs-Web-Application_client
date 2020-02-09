import React, { useState, useEffect, useRef } from "react";
import productService from "../services/productService";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import Fade from "@material-ui/core/Fade";
import Header from "./Header";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#638585" }
  }
});

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
    height: "100vh",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    overflow: "hidden"
  },
  hide: {
    display: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    paddingLeft: 20,
    paddingRight: 20,
    height: "calc(100% - 56px)",
    overflow: "scroll"
    // marginLeft: -drawerWidth
  },
  orderContent: {
    marginTop: 15
  },
  orderTitle: {
    fontFamily: "Microsoft JhengHei"
  },
  button: {
    marginTop: 10,
    textAlign: "right",

    "& > button": {
      fontFamily: "Microsoft JhengHei",
      color: "#3D405B",

      "&:last-child": {
        "&:hover": {
          backgroundColor: "#FCF1DB"
        }
      }
    }
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    marginTop: 10
  },
  detailList: {
    listStyle: "none",
    padding: "0 10px",
    fontFamily: "Microsoft JhengHei",

    "& > li": {
      margin: "5px 0",
      padding: "0 10px",
      position: "relative"
    }
  },
  textArea: {
    resize: "none",
    padding: 5,
    outline: "none",
    borderRadius: 5,
    width: "96%"
  },
  formControl: {
    width: "100%"
  },
  label: {
    margin: "10px 0 3px",
    fontSize: 12,
    color: "#638585"
  },
  countContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5
  },
  counter: {
    display: "flex",
    marginBottom: 8,
    alignItems: "baseline"
  },
  counterTitle: {
    fontSize: 14,
    width: "15%",
    color: "#638585"
  },
  btnGroup: {
    width: "85%",
    display: "flex",
    justifyContent: "space-evenly",

    "& > button": {
      width: "20%",
      borderRadius: "50%",
      border: "none",
      fontSize: 20,
      color: "#7FABAB",
      background: "none",
      outline: "none",

      "&:hover": {
        cursor: "pointer",
        color: "#E07A5F"
      }
    },

    "& > input": {
      border: "none",
      borderBottom: "1px solid #3D405B",
      width: "35%",
      textAlign: "center",
      color: "#3D405B",
      fontSize: 16,
      outline: "none",

      "&:hover": {
        cursor: "default"
      }
    }
  },
  notes: {
    marginTop: 0,
    fontSize: 12,
    color: "#638585"
  },
  calendarGrid: {
    border: "1px solid #DEDCCA",
    position: "absolute",
    display: "none",
    backgroundColor: "#fff",
    zIndex: 1,
    width: "90%",
    top: 44
  },
  week: {
    display: "inline-block",
    width: "calc(100% / 7)",
    textAlign: "center",
    color: "#606278",
    padding: "2px 0"
  },
  day: {
    display: "inline-block",
    width: "calc(100% / 7)",
    textAlign: "center",
    color: "#606278",
    padding: "2px 0",
    lineHeight: "30px",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F4F1DE"
    }
  },
  weekDayDiv: {
    padding: 5,
    fontSize: 14
  },
  weekend: {
    color: "#E07A5F",
    padding: "2px 0",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F4F1DE"
    }
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F9F7ED",

    "& > button": {
      border: "none",
      background: "none",
      outline: "none",
      color: "#E5927C",
      padding: "3px 6px",

      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#F4F1DE"
      },
      "&:disabled": {
        color: "#EDEDF0",
        "&:hover": {
          backgroundColor: "#F9F7ED",
          cursor: "default"
        }
      }
    }
  },
  month: {
    display: "inline-block",
    marginRight: 15
  },
  notThisMonth: {
    "&:hover": {
      cursor: "default",
      backgroundColor: "#fff"
    }
  },
  clicked: {
    backgroundColor: "#F4F1DE"
  },
  disabledDay: {
    color: "#EDEDF0",

    "&:hover": {
      backgroundColor: "#fff",
      cursor: "default"
    }
  },
  disabledToday: {
    color: "#F3CEC4",

    "&:hover": {
      backgroundColor: "#fff",
      cursor: "default"
    }
  },
  dateInput: {
    position: "relative",
    width: "95%",
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid #3D405B",
    color: "#3D405B",
    fontSize: 16,
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 2,
    "&:focus": {
      borderBottom: "1px solid #9BD0D0"
    }
  },
  timeSelect: {
    color: "#638585"
  },
  show: {
    display: "block"
  }
}));

function OrderDetails() {
  const classes = useStyles();
  const [time, setTime] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);
  const [isShowCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [createTime, setCreateTime] = useState("");
  let [clickDate, setClickDate] = useState("");
  const [timeSelect, setTimeSelect] = useState(false);
  const inputRef = useRef(null);
  const weekend = ["日", "一", "二", "三", "四", "五", "六"];
  const monthEnName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December"
  ];
  const history = useHistory();

  const handleChangeNote = event => {
    setNotes(event.target.value);
  };

  const handleClickPlusAdult = () => {
    if (adult === 10) {
      return;
    }
    setAdult(adult + 1);
  };

  const handleClickMinusAdult = () => {
    if (adult < 1) {
      return;
    }
    setAdult(adult - 1);
  };

  const handleClickPlusChildren = () => {
    if (children === 10) {
      return;
    }
    setChildren(children + 1);
  };

  const handleClickMinusChildren = () => {
    if (children < 1) {
      return;
    }
    setChildren(children - 1);
  };

  useEffect(() => {
    console.log(7890, "get order details useEffect is working");
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const order_ID = urlParams.get("order_ID");
    console.log("order_ID", order_ID);
    const res = await productService.getOrderDetails(order_ID);
    console.log(111, "get order details res", res);
    if (res.code === 200) {
      if (sessionStorage.getItem("user") === null) {
        console.log("你是從email的查詢此筆訂單來的!!");
        let currentTime = new Date().getTime();
        const user = Object.assign({}, { code: 200, member: res.member, login: true, time: currentTime });
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("正常登入後下訂單, 直接點選查詢訂單鈕!!");
      }
      const createOrderTime = new Date(res.orderDetails.create_time);
      const create_Date = `${createOrderTime.getFullYear()} / ${createOrderTime.getMonth() +
        1} / ${createOrderTime.getDate()}`;
      console.log("create_Date", create_Date);
      const create_Minutes =
        createOrderTime.getMinutes() > 9 ? `${createOrderTime.getMinutes()}` : `0${createOrderTime.getMinutes()}`;
      const create_Time = `${createOrderTime.getHours()}:${create_Minutes}`;
      console.log("res.orderDetails", res.orderDetails.dateTime);
      const bookingTime = new Date(res.orderDetails.dateTime);
      const date = `${bookingTime.getFullYear()} / ${bookingTime.getMonth() + 1} / ${bookingTime.getDate()}`;
      console.log("date", date);
      const time = `${bookingTime.getHours()}`;
      console.log("time", time);
      setOrderID(res.orderDetails._id);
      setCreateTime(`${create_Date} - ${create_Time}`);
      setClickDate(date);
      setTime(time);
      setTimeSelect(true);
      setAdult(res.orderDetails.adult);
      setChildren(res.orderDetails.children);
      setNotes(res.orderDetails.notes);
    } else {
      alert("您已登入超過10分鐘, 系統為確保您的資料安全, 已將您登出!! 請您再次登入進行修改, 謝謝!");
      sessionStorage.clear();
      history.push("/login");
    }
  };

  const handleChange = event => {
    setTime(event.target.value);
    setTimeSelect(true);
  };

  const handleSaveChangeOrder = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const order_ID = urlParams.get("order_ID");
    history.push(`/orderdetails/save?order_ID=${order_ID}`);
    const saveChangeOrderResult = await productService.saveModifiedOrderDetails(
      order_ID,
      clickDate,
      time,
      adult,
      children,
      notes
    );
    console.log("saveChangeOrderResult", saveChangeOrderResult);
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user", user);
    if (saveChangeOrderResult.code === 200) {
      history.push(`/orders?name=${user.member}`);
    } else {
      alert("編輯時間已超過10分鐘, 系統已自動將您登出, 麻煩您再次進行登入!! 謝謝!");
      history.push("/login");
    }
  };

  const handleCancelChangeOrder = () => {
    const isCancel = window.confirm("請問您確定要取消修改訂單嗎?");
    const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    console.log("isCancel", isCancel);
    if (isCancel && user.login) {
      history.push(`/orders?name=${user.member}`);
    } else {
      alert("您尚未登入, 麻煩您登入, 即可查閱所有訂單! 謝謝!");
      history.push("/login");
    }
  };

  const Calendar = () => {
    let changeMonth = "";
    const thisMonth = `${today.getFullYear()}${today.getMonth()}`;

    useEffect(() => {
      changeMonth = `${year}${month}`;
      setMonth(month);
      if (changeMonth === thisMonth) {
        setDisabledPrev(true);
      }
    }, [month, changeMonth]);

    const handlePrevMonth = () => {
      setDisabledPrev(false);
      setDisabledNext(false);
      if (month === 0 && month + 11 === 11) {
        setMonth(month + 11);
        setYear(year - 1);
        setDisabledPrev(true);
      } else {
        setMonth(month - 1);
      }
    };

    const handleNextMonth = () => {
      const todayMonth = today.getMonth() === 11 ? 0 : today.getMonth();
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
        setDisabledPrev(false);
        if (year === today.getFullYear() + 1 && month + 1 === todayMonth + 1) {
          setDisabledNext(true);
        }
      } else {
        setMonth(month + 1);
        setDisabledPrev(false);
        if (year === today.getFullYear() && month + 1 === todayMonth + 1) {
          setDisabledNext(true);
        }
      }
    };

    const handleClickDate = (value, disabled, disabledToday) => {
      if (disabled || disabledToday) {
        return;
      } else {
        const clickedDate = `${year}/${month + 1}/${value}`;
        setClickDate(clickedDate);
        setChecked(prev => !prev);
        setShowCalendar(false);
      }
    };

    const createWeekDay = () => {
      const weekday = weekend.map((item, idx) => {
        return (
          <span key={idx} className={classes.week}>
            {item}
          </span>
        );
      });

      return weekday;
    };

    const createCalendar = (year, month) => {
      const days = new Date(year, month + 1, 0);
      const dayArray = [];
      let rows = [];
      let cells = [];
      let firstDay = new Date(year, month, 1).getDay();
      let lastDay = new Date(year, month, days.getDate()).getDay();
      for (let i = 1; i <= days.getDate(); i++) {
        const todayDay = new Date(year, month, i).getDay();
        dayArray.push([i, todayDay]);
      }
      while (firstDay !== 0) {
        cells.push([]);
        firstDay--;
      }
      dayArray.map((item, idx) => {
        if (item[1] % 6 !== 0 || item[1] === 0) {
          cells.push(item);
        } else {
          if (item[1] === 6) {
            cells.push(item);
          }
          rows.push(cells);
          cells = [];
        }
        if (idx === dayArray.length - 1) {
          while (lastDay !== 6) {
            cells.push([]);
            lastDay++;
          }
          rows.push(cells);
        }
        return true;
      });
      // console.log("rows", rows);
      const calendar = rows.map((item, idx) => {
        return (
          <div key={idx}>
            {item.map((item, idx) => {
              const isWeekend = item[1] === 0 || item[1] === 6 ? true : false;
              const notThisMonth = item.length === 0 ? true : false;
              const clicked = `${year}/${month + 1}/${item[0]}` === `${clickDate}` ? true : false;
              const disabled =
                year === today.getFullYear() && month === today.getMonth() && item[0] < today.getDate() ? true : false;
              const disabledToday =
                year === today.getFullYear() && month === today.getMonth() && item[0] === today.getDate()
                  ? true
                  : false;
              return (
                <span
                  className={clsx(classes.day, {
                    [classes.weekend]: isWeekend,
                    [classes.notThisMonth]: notThisMonth,
                    [classes.clicked]: clicked,
                    [classes.disabledDay]: disabled,
                    [classes.disabledToday]: disabledToday
                  })}
                  key={idx}
                  onClick={() => handleClickDate(item[0], disabled, disabledToday)}
                >
                  {item[0]}
                </span>
              );
            })}
          </div>
        );
      });

      return calendar;
    };

    useEffect(() => {
      if (isShowCalendar) {
        inputRef.current.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowCalendar]);

    const toggleShowCalendar = () => {
      setChecked(prev => !prev);
      setShowCalendar(!isShowCalendar);
    };

    return (
      <React.Fragment>
        <p className={classes.label}>日期</p>
        <input
          type="input"
          className={clsx(classes.dateInput)}
          onClick={toggleShowCalendar}
          ref={inputRef}
          value={clickDate}
          readOnly
        />
        <FormHelperText className={clsx({ [classes.hide]: clickDate !== "" ? true : false })}>
          請選擇訂位日期!
        </FormHelperText>
        <div className={clsx(classes.calendarGrid, { [classes.show]: isShowCalendar })}>
          <Fade in={checked}>
            <div>
              <div className={classes.calendarHeader}>
                <button onClick={handlePrevMonth} disabled={disabledPrev ? true : false}>
                  <ArrowLeftRoundedIcon />
                </button>
                <div className={classes.header}>
                  <span className={classes.month}>{monthEnName[month]}</span>
                  <span>{year}</span>
                </div>
                <button onClick={handleNextMonth} disabled={disabledNext ? true : false}>
                  <ArrowRightRoundedIcon />
                </button>
              </div>
            </div>
          </Fade>
          <div className={classes.weekDayDiv}>{createWeekDay()}</div>
          {createCalendar(year, month)}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <Grid item xs={12} className={classes.orderContent}>
            <Typography className={classes.orderTitle}>
              <span>訂單編號 : </span>
              <span>{orderID}</span>
            </Typography>
            <Typography className={classes.orderTitle}>
              <span>成立訂單 : </span>
              <span>{createTime}</span>
            </Typography>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <Calendar />
                </li>
                <li>
                  <FormControl className={classes.formControl}>
                    <MuiThemeProvider theme={theme}>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        className={clsx({ [classes.timeSelect]: timeSelect })}
                      >
                        時間
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={time}
                        onChange={handleChange}
                      >
                        <MenuItem value={12}>12:00</MenuItem>
                        <MenuItem value={13}>13:00</MenuItem>
                        <MenuItem value={14}>14:00</MenuItem>
                      </Select>
                    </MuiThemeProvider>
                  </FormControl>
                </li>
                <li>
                  <p className={classes.label}>人數</p>
                  <div className={classes.countContainer}>
                    <div className={classes.counter}>
                      <span className={classes.counterTitle}>大人</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusAdult}>-</button>
                        <input name="adult" type="text" value={adult || 0} readOnly />
                        <button onClick={handleClickPlusAdult}>+</button>
                      </div>
                    </div>
                    <div className={classes.counter}>
                      <span className={classes.counterTitle}>小孩</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusChildren}>-</button>
                        <input name="children" type="text" value={children || 0} readOnly />
                        <button onClick={handleClickPlusChildren}>+</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <p className={classes.notes}>備註</p>
                  <textarea
                    name="notes"
                    id=""
                    cols="30"
                    rows="5"
                    className={classes.textArea}
                    onChange={handleChangeNote}
                    value={notes || ""}
                  ></textarea>
                </li>
              </ul>
            </Paper>
            <Grid item xs={12} className={classes.button}>
              <Button onClick={handleCancelChangeOrder}>取消</Button>
              <Button onClick={handleSaveChangeOrder}>儲存</Button>
            </Grid>
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default OrderDetails;
