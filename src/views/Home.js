import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import productService from "../services/productService";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";
import Rice from "../images/rice.jpg";
import Noddles from "../images/noodles.jpg";
import Dessert from "../images/dessert.jpg";
import Beverage from "../images/beverage.jpg";
import config from "../config";
import LazyLoad from "react-lazyload";

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
    height: "100%",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    position: "relative",
    overflow: "hidden"
  },
  card: {
    position: "relative"
  },
  cardContent: {
    padding: 0,
    position: "relative",
    paddingBottom: "0 !important"
  },
  cardActions: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    textDecoration: "none",
    width: "100%",
    height: "100%",

    "& > button": {
      width: "100%",
      height: "100%",
      "& > span": {
        fontFamily: "Microsoft JhengHei",
        color: "#F4F1DE",
        fontSize: 18
      },
      "&:hover": {
        backgroundColor: "#DBDCE1",
        opacity: 0.6,
        transition: ".3s ease-in-out",
        "& > span": {
          color: "#3D405B",
          fontWeight: "bold"
        }
      }
    }
  },
  item: {
    padding: "10px",
    overflow: "hidden"
  },
  blockTitle: {
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B"
  },
  guessItem: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginTop: "5px"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  restaurantName: {
    width: "65%",
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: "calc(100% - 100px)",
    overflow: "scroll"
    // marginLeft: -drawerWidth
  },
  restaurants: {
    display: "flex",
    flexWrap: "wrap",

    "@media screen and (min-width:980px)": {
      flexWrap: "nowrap"
    }
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

const categoryStyles = makeStyles({
  randomBlock: {
    display: "flex",
    overflowX: "auto",
    "@media screen and (min-width:980px)": {
      flexWrap: "wrap"
    }
  },
  div: {
    padding: "10px 5px 10px",
    "&:hover": {
      cursor: "pointer",
      "& > div > img": {
        backgroundColor: "#DBDCE1",
        opacity: 0.6,
        transition: ".3s ease-in-out"
      }
    },
    "@media screen and (min-width:980px)": {
      width: "calc(100% / 5 - 5px)"
    }
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "0",
    width: "100%",
    "& > span": {
      backgroundColor: "#E07A5F"
    },
    "& > span > span": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  card: {
    textAlign: "center",
    "& > img": {
      width: 150,
      height: 100
    }
  }
});

function Home() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const categoryClasses = categoryStyles();
  const history = useHistory();

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  }, [restaurant]);

  const compaireKindComponent = str => {
    switch (str) {
      case "飯":
        return Rice;
      case "麵":
        return Noddles;
      case "甜點":
        return Dessert;
      case "飲料":
        return Beverage;
      default:
        return "";
    }
  };

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log("restaurant", restaurant);

  const handleClickRestaurant = (_id, name) => {
    console.log("handleClickRestaurant is working!!!");
    // /detail?name=test2&_id=5dc3d5eb4e48673b44ec995b
    history.push(`/detail?name=${name}&_id=${_id}`);
  };

  return (
    <Container>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <Grid item xs={12} className={classes.restaurants}>
            {restaurant ? (
              restaurant.distinctByKind.map((kind, idx) => {
                return (
                  <Grid item xs={6} className={classes.item} key={idx}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <LazyLoad height={200}>
                          <Typography variant="body2" component="p">
                            <img src={compaireKindComponent(kind)} alt="" className={classes.img} />
                          </Typography>
                        </LazyLoad>
                        <Link to={`/search?searchKeyWord=${kind}`} className={classes.cardActions}>
                          <Button size="small">{kind}</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <h4 className={classes.blockTitle}>猜你喜歡...</h4>
            <Grid item xs={12} className={categoryClasses.randomBlock}>
              {restaurant ? (
                restaurant.randomRestaurants.map(result => {
                  // console.log(12345, result);
                  return (
                    <div
                      key={result._id}
                      className={categoryClasses.div}
                      onClick={() => handleClickRestaurant(result._id, result.name)}
                    >
                      <Card className={categoryClasses.card}>
                        <LazyLoad>
                          <img src={`${config.Serverdomain}/${result.image_path.main}`} alt="" />
                        </LazyLoad>
                      </Card>
                      <Grid item xs={12} className={classes.guessItem}>
                        <span className={classes.restaurantName}>{result.name}</span>
                        <Badge
                          color="secondary"
                          overlap="circle"
                          className={categoryClasses.badge}
                          badgeContent={<span>{result.category.kind}</span>}
                        ></Badge>
                      </Grid>
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </Grid>
          </Grid>
        </main>
        <div className={classes.footerDiv}>
          <Footer selectedValue={0} />
        </div>
      </div>
    </Container>
  );
}

export default Home;
