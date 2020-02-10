import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Header from "./Header";
import Logo from "../images/logo.png";

const useStyles = makeStyles(theme => ({
  container: {
    fontFamily: "Microsoft JhengHei"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  logo: {},
  paperText: {
    textAlign: "left",
    boxShadow: "none",
    margin: "0 auto",
    width: "50%"
  },
  center: {
    textAlign: "center"
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    "& > a": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "10px 0",
    fontFamily: "Microsoft JhengHei"
  }
}));

function Completed() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    console.log("completed page user", user);
    setUserName(user.member);
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.paper}>
          <img src={Logo} alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paperText}>
            <p className={classes.center}>感謝您的訂位!</p>
            <p>請至網站「查詢訂單」查看訂單明細。</p>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Link to="/">
            <Button variant="outlined" className={classes.button}>
              回首頁
            </Button>
          </Link>
          <Link to={`/orders?name=${userName}`}>
            <Button variant="outlined" className={classes.button}>
              查看訂單
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Completed;
