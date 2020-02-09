import React, { useEffect, useRef, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { googleMapKey } from "../googleMapKey";
import classNames from "classnames";
import Header from "./Header";
import Marker from "../images/marker.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    position: "relative",
    height: "100vh",
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  container: {
    position: "relative",
    height: "100vh",
    overflow: "scroll",
    width: 600
  },
  grid: {
    width: "100%",
    padding: "10px",
    margin: "2px 0",
    display: "flex",
    position: "sticky",
    zIndex: 1,
    top: 62,
    backgroundColor: "#fff"
  },
  searchBar: {
    fontSize: 16,
    color: "#3D405B",
    border: "1px solid #B8B9C3",
    borderRadius: 20,
    width: "100%",
    padding: "5px 15px 5px",

    "&:focus": {
      outline: "none"
    }
  },
  searchIcon: {
    marginLeft: "-40px"
  },
  searchBtn: {
    borderRadius: 50,
    height: 40,
    minWidth: 40,
    padding: 5,
    "& > span > svg": {
      color: "#32354B"
    },
    "&:hover": {
      backgroundColor: "#FCF1DB"
    }
  },
  restaurantImage: {
    width: "100%",
    borderRadius: 10,
    "& > img": {
      width: "100%",
      height: 200
    }
  },
  restaurantName: {
    paddingLeft: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    fontFamily: "Microsoft JhengHei",
    fontSize: 20,
    margin: "0 0 5px",
    color: "#3D405B"
  },
  paperGrid: {
    position: "relative",
    marginBottom: 50,
    padding: "0 20px"
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    marginTop: 10
  },
  detailList: {
    listStyle: "none",
    paddingLeft: 10,
    fontFamily: "Microsoft JhengHei",

    "& > li": {
      margin: "5px 0"
    }
  },
  title: {
    display: "inline-block",
    width: "100%",
    color: "#838596"
  },
  content: {
    paddingLeft: 15,
    display: "inline-block",
    color: "#4E5169"
  },
  googleMap: {
    padding: "0 5px",
    minHeight: 150,
    border: "1px solid #B8B9C3",
    marginTop: 15,
    position: "relative"
  },
  map: {
    height: "30vh",
    width: "100%"
  },
  paperFooter: {
    display: "flex",
    justifyContent: "center",
    padding: "0 5px",
    margin: "10px 0 5px",
    "& > a": {
      textDecoration: "none",
      width: "100%"
    }
  },
  booking: {
    width: "100%",
    borderRadius: 10,
    fontFamily: "Microsoft JhengHei",
    "&:hover": {
      backgroundColor: "#FCF1DB"
    }
  },
  slider: {
    "& > button::before": {
      color: "#FCF1DB",

      "&:hover": {
        color: "#3D405B"
      }
    },
    "& > button:first-child": {
      left: 0,
      zIndex: 1
    },
    "& > button:first-child ~ button": {
      right: 0
    },
    "& > ul": {
      display: "none !important"
    }
  },
  searchResultGrid: {
    position: "absolute",
    zIndex: 2,
    width: "90%",
    left: 10
  },
  saerchListItem: {
    padding: 10,
    backgroundColor: "#FEFDFC",
    border: "1px solid #B8B9C3",
    borderTop: "none",
    width: "95%",
    margin: "0 auto",

    "& > p": {
      padding: 10,
      margin: "5px 0",
      fontFamily: "Microsoft JhengHei",
      color: "#4E5169",
      "&:hover": {
        fontWeight: "bold",
        backgroundColor: "#F6DAD3",
        cursor: "pointer"
      }
    }
  },
  searchNone: {
    padding: 10,
    margin: "5px 0",
    fontFamily: "Microsoft JhengHei",
    color: "#4E5169",
    fontWeight: "normal",
    "&:hover": {
      fontWeight: "inherit",
      backgroundColor: "#FEFDFC",
      cursor: "default"
    }
  },
  footerDiv: {
    position: "absolute",
    bottom: 0,
    width: "inherit",
    "& > div": {
      position: "static"
    }
  }
}));

function Detail() {
  const classes = useStyles();
  const [form, setForm] = useState(null);
  const [queryName, setQueryName] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [blur, setBlur] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const [googleScript, setGoogleScript] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (searchKeyWord) {
      console.log("search key word change...");
      async function fetching() {
        let res = await productService.searchByKeyWord(searchKeyWord);
        console.log(123, res, res.restaurants.length);
        if (res.restaurants.length > 0) {
          console.log("res 有資料");
          setSearchResult(res.restaurants);
        }
      }
      fetching();
    }
  }, [searchKeyWord]);

  const getRestaurantDetail = async () => {
    console.log("[getRestaurantDetail]取得資料開始");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const _id = urlParams.get("_id");
    const res = await productService.getRestaurantDetail(name, _id);
    console.log("res", res);
    setRestaurantName(name);
    setQueryName(name);
    setForm({
      name: name,
      address: res.restaurant.address,
      phone: res.restaurant.phone,
      info: res.restaurant.info,
      image_path: res.restaurant.image_path
    });

    console.log("[getRestaurantDetail]取得資料結束", res);
    return res.restaurant;
  };

  const SimpleSlider = ({ image_path }) => {
    console.log("image_path", image_path);
    const classes = useStyles();
    let settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings} className={classes.slider}>
        <div className={classes.restaurantImage}>
          <img src={image_path.main} alt="" />
        </div>
        {image_path.products.map((item, idx) => {
          return (
            <div className={classes.restaurantImage} key={idx}>
              <img src={item} alt="" />
            </div>
          );
        })}
      </Slider>
    );
  };

  function Map({ options, onMount, className }) {
    console.log("Map function is working!!", onMount);
    const ref = useRef();
    useEffect(() => {
      const onLoad = async () => {
        if (!form) {
          const restaurantResult = await getRestaurantDetail();
          const map = new window.google.maps.Map(ref.current, options);
          onMount && onMount(map, restaurantResult.address);
          script.removeEventListener(`load`, onLoad);
        }
      };

      const script = document.createElement(`script`);
      // const scriptPromise = new Promise((resolve, reject) => {
      if (!window.google) {
        document.body.append(script);
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}`;
        script.async = false;
        script.defer = true;
        script.addEventListener(`load`, () => {
          onLoad();
          // resolve(true);
        });
      } else {
        console.log("google map script is exist!");
        // resolve(true);
        onLoad();
      }
      // });

      // scriptPromise.then(value => {
      //   console.log("google map script is appended!", value);
      //   if (value) {
      //     console.log("in if?????");
      //   }
      // });
    }, [options, onMount, googleScript]);
    return <div {...{ ref, className }} />;
  }

  const createMarker = () => (map, address) => {
    console.log("address", address);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        if (status === "OK") {
          console.log("OK???", results[0].geometry.location);
          map.setCenter(results[0].geometry.location);
          const marker = new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: "",
            icon: Marker,
            visible: true
          });
          return marker;
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      }
    );
  };

  const mapProps = {
    options: {
      zoom: 15
    },
    onMount: createMarker()
  };

  const MemoMap = useCallback(<Map className={classes.map} {...mapProps} />, []);

  const renderSearchResult = () => {
    console.log("list item", searchResult);
    if (searchKeyWord.length > 0 && blur === false) {
      if (searchResult.length > 0) {
        const list = searchResult.map((item, idx) => (
          <p key={idx} onClick={() => handleClickItem(item)}>
            {item.name}
          </p>
        ));
        return <div className={classes.saerchListItem}>{list}</div>;
      } else {
        return (
          <h4 className={classNames(classes.searchNone, classes.saerchListItem)}>抱歉, 沒有您想要搜尋的餐廳資訊!!</h4>
        );
      }
    }
  };

  const handleSubmit = async () => {
    setQueryName(searchKeyWord);
    setBlur(true);
    history.push(`/search?searchKeyWord=${searchKeyWord}`);
  };

  const handleClickItem = item => {
    setSearchKeyWord(item.name);
    setQueryName(item.name);
    setBlur(true);
  };

  const handleChange = e => {
    setSearchResult([]);
    setBlur(false);
    setSearchKeyWord(e.target.value);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.grid}>
          <input
            type="text"
            name="searchbar"
            className={classes.searchBar}
            value={searchKeyWord}
            onChange={handleChange}
            placeholder="search for restaurant"
          />
          <div className={classes.searchIcon}>
            <Button className={classes.searchBtn}>
              <SearchIcon className={classes.icon} onClick={handleSubmit} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.searchResultGrid}>
          {renderSearchResult()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom className={classes.restaurantName}>
            {form ? form.name : queryName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              {form ? <SimpleSlider image_path={form.image_path} /> : <></>}
            </div>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <span className={classes.title}>店家名稱 : </span>
                  <span className={classes.content}>{form ? form.name : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>地址 : </span>
                  <span className={classes.content}>{form ? form.address : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>電話 : </span>
                  <span className={classes.content}>{form ? form.phone : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>用餐時間 : </span>
                  <span className={classes.content}>10:00 – 21:30</span>
                </li>
                <li>
                  <span className={classes.title}>店家描述 : </span>
                  <span className={classes.content}>{form ? form.info : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>保留資訊 : </span>
                  <span className={classes.content}>將為您保留訂位10分鐘, 若10分鐘過後仍未到場, 即取消訂位!</span>
                </li>
                <li>
                  <span className={classes.title}>最低消費 : </span>
                  <span className={classes.content}>每位顧客最低消費為180元。</span>
                </li>
              </ul>
              <div className={classes.googleMap} id="map">
                {MemoMap}
              </div>
              <div className={classes.paperFooter}>
                <Link to={`/booking?restaurantName=${restaurantName}`}>
                  <Button className={classes.booking}>我要訂位</Button>
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </Container>
  );
}

export default Detail;
