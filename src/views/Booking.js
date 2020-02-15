import React, { useState, useRef, useEffect } from "react";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import clsx from "clsx";
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
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    height: "100vh",
    position: "relative",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    overflow: "hidden",
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  container: {
    height: "calc(100% - 56px)",
    overflow: "scroll"
  },
  restaurantName: {
    padding: "10px 10px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    fontFamily: "Microsoft JhengHei",
    fontSize: 20,
    margin: "0 0 5px"
  },
  paperGrid: {
    position: "relative",
    marginBottom: 20,
    padding: "0 20px",
    "@media screen and (min-width:700px)": {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    "@media screen and (min-width:700px)": {
      marginTop: 10,
      display: "flex",
      flex: 1
    }
  },
  detailList: {
    listStyle: "none",
    padding: "0 10px",
    fontFamily: "Microsoft JhengHei",

    "@media screen and (min-width:700px)": {
      width: "100%"
    },
    "& > li": {
      margin: "5px 0",
      padding: "0 10px",
      position: "relative"
    }
  },
  paperFooter: {
    display: "flex",
    justifyContent: "center",
    padding: "0 5px",
    margin: "10px 0 5px"
  },
  booking: {
    width: "100%",
    borderRadius: 10,
    fontFamily: "Microsoft JhengHei",
    "&:hover": {
      backgroundColor: "#FCF1DB"
    }
  },
  card: {
    minWidth: 275,
    marginTop: 15,
    backgroundColor: "#F7F4E7",
    "@media screen and (min-width:700px)": {
      display: "flex",
      marginLeft: 20
    },
    "@media screen and (min-width: 980px)": {
      flexGrow: 1
    }
  },
  pos: {
    marginBottom: 5,
    color: "#606278",
    fontFamily: "Microsoft JhengHei",
    paddingLeft: 25,
    fontWeight: "bold",
    "@media screen and (min-width:700px)": {
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
  title: {
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
  calendarIcon: {
    position: "absolute",
    left: 30,
    color: "#7FABAB",
    "@media screen and (min-width:700px)": {
      left: 0
    }
  },
  orderDetail: {
    paddingLeft: 15,
    listStyleType: "circle",
    "& > li": {
      fontSize: 14,
      fontFamily: "Microsoft JhengHei",
      "@media screen and (min-width: 700px)": {
        fontSize: 16,
        lineHeight: "35px"
      }
    }
  },
  calendarGrid: {
    border: "1px solid #DEDCCA",
    position: "absolute",
    display: "none",
    backgroundColor: "#fff",
    zIndex: 1,
    width: "90%",
    top: 43
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
  },
  hide: {
    display: "none"
  },
  error: {
    borderBottom: "2px solid #f44336 !important"
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

function Booking() {
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
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [adultError, setAdultError] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [timeSelect, setTimeSelect] = useState(false);
  const inputRef = useRef(null);
  let [clickDate, setClickDate] = useState("");
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantName = urlParams.get("restaurantName");
    const sessionStorageForm =
      sessionStorage.getItem("form") !== null ? JSON.parse(sessionStorage.getItem("form")) : {};
    if (Object.keys(sessionStorageForm).length > 0) {
      if (sessionStorageForm.restaurantName !== restaurantName) {
        const confirm = window.confirm(
          `您有一筆訂單尚未訂購, 餐廳名稱: ${sessionStorageForm.restaurantName}, 請問您是否要訂購?`
        );
        if (confirm) {
          setRestaurantName(sessionStorageForm.restaurantName);
          setClickDate(sessionStorageForm.clickDate);
          setTime(sessionStorageForm.time);
          setAdult(sessionStorageForm.adult);
          setChildren(sessionStorageForm.children);
          setNotes(sessionStorageForm.notes);
        } else {
          setRestaurantName(sessionStorageForm.restaurantName);
          sessionStorage.removeItem("form");
        }
      } else {
        setRestaurantName(sessionStorageForm.restaurantName);
        setClickDate(sessionStorageForm.clickDate);
        setTime(sessionStorageForm.time);
        setAdult(sessionStorageForm.adult);
        setChildren(sessionStorageForm.children);
        setNotes(sessionStorageForm.notes);
      }
    } else {
      setRestaurantName(restaurantName);
    }
  }, []);

  const handleChange = event => {
    setTime(event.target.value);
    setTimeError(false);
    setTimeSelect(true);
  };

  const handleClickPlusAdult = () => {
    if (adult === 10) {
      return;
    }
    setAdult(adult + 1);
    setAdultError(false);
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

  const handleChangeNote = event => {
    setNotes(event.target.value);
  };

  const Calendar = () => {
    // let changeMonth = "";
    const [changeMonth, setChangeMonth] = useState("");
    // const [thisMonth, setThisMonth] = useState("");
    const thisMonth = `${today.getFullYear()}${today.getMonth()}`;
    // setThisMonth(this_Month);

    useEffect(() => {
      setChangeMonth(`${year}${month}`);
      // changeMonth = `${year}${month}`;
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
        setDateError(false);
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
          className={clsx(classes.dateInput, { [classes.error]: dateError })}
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

  const verification = () => {
    const errorText = "請填選訂位日期, 時間, 至少 1 位大人";
    if (clickDate !== "" && time !== "" && adult !== 0) {
      console.log("驗證通過");
      return true;
    } else {
      if (clickDate === "") {
        setDateError(true);
      }
      if (time === "") {
        setTimeError(true);
      }
      if (adult === 0) {
        setAdultError(true);
      }
      alert(errorText);
    }
  };

  const onSubmit = async () => {
    const verifyResult = verification();
    if (verifyResult) {
      const sessionUser = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
      console.log("user.login", sessionUser.login);
      const order = await productService.booking(clickDate, time, adult, children, notes, restaurantName, sessionUser);
      console.log("order", order);
      if (order.code === 200) {
        sessionStorage.removeItem("form");
        history.push("/completed");
      } else if (order.code === 403) {
        alert("您尚未登入, 系統將為您保留此筆訂單細節, 麻煩您先登入喲!!");
        const form = Object.assign({}, { restaurantName, clickDate, time, adult, children, notes });
        sessionStorage.setItem("form", JSON.stringify(form));
        sessionStorage.removeItem("user");
        history.push("/login");
      }
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom className={classes.restaurantName}>
            {restaurantName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
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
                        error={timeError}
                      >
                        <MenuItem value={12}>12:00</MenuItem>
                        <MenuItem value={13}>13:00</MenuItem>
                        <MenuItem value={14}>14:00</MenuItem>
                      </Select>
                    </MuiThemeProvider>
                    <FormHelperText className={clsx({ [classes.hide]: time !== "" ? true : false })}>
                      請選擇訂位時間!
                    </FormHelperText>
                  </FormControl>
                </li>
                <li>
                  <p className={classes.label}>人數</p>
                  <div className={classes.countContainer}>
                    <div className={classes.counter}>
                      <span className={classes.title}>大人</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusAdult}>-</button>
                        <input
                          name="adult"
                          type="text"
                          value={adult}
                          readOnly
                          className={clsx({ [classes.error]: adultError })}
                        />
                        <button onClick={handleClickPlusAdult}>+</button>
                      </div>
                    </div>
                    <div className={classes.counter}>
                      <span className={classes.title}>小孩</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusChildren}>-</button>
                        <input name="children" type="text" value={children} readOnly />
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
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                  <EventRoundedIcon className={classes.calendarIcon} />
                  <span>定位資訊</span>
                </Typography>
                <Typography variant="h5" component="h2" className={classes.restaurantName}>
                  {restaurantName}
                </Typography>
                <ul className={classes.orderDetail}>
                  <li>
                    日期 : <span>{clickDate}</span>
                  </li>
                  <li>
                    時間 : <span>{time ? `${time}:00` : ""}</span>
                  </li>
                  <li>
                    人數 :
                    <span>
                      &nbsp;
                      {adult} 位大人 {children} 位小孩
                    </span>
                  </li>
                  <li>
                    備註 : <span>{notes !== "" ? notes : "無備註"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.paperFooter}>
          <Button className={classes.booking} onClick={() => onSubmit()}>
            確認訂位
          </Button>
        </div>
      </Grid>
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </Container>
  );
}

export default Booking;
