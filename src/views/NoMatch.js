import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    height: "100%",
    "@media screen and (min-width: 600px)": {
      boxShadow: "1px 5px 15px 0px #DBDCE1"
    }
  },
  h1: {
    height: 100,
    backgroundColor: "#F9F7ED",
    margin: "auto 0",
    lineHeight: "100px",
    fontFamily: "Microsoft JhengHei",
    color: "#E07A5F"
  }
}));

function NoMatch() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <h1 className={classes.h1}>404 Not Found...</h1>
    </Container>
  );
}

export default NoMatch;
