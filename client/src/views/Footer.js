import React, { useState } from "react";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    "& > a > span": {
      color: "#9BD0D0"
    },
    "& > a:hover": {
      "& > span": {
        color: "#F4D28B"
      }
    }
  },
  order: {
    "& > span > span:last-child": {
      position: "relative"
    }
  },
  selected: {
    "& > span": {
      color: "#638585 !important"
    }
  }
});

export default function SimpleBottomNavigation({ selectedValue }) {
  const classes = useStyles();
  const [value, setValue] = useState(selectedValue);
  const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<HomeRoundedIcon />}
        className={clsx({ [classes.selected]: value === 0 })}
      />
      <BottomNavigationAction
        component={Link}
        to={`/orders?name=${user.member}`}
        label="Orders"
        icon={<RestaurantRoundedIcon />}
        className={clsx(classes.order, { [classes.selected]: value === 1 })}
      />
      <BottomNavigationAction
        component={Link}
        to="/member"
        label="Account"
        icon={<AccountCircleRoundedIcon />}
        className={clsx({ [classes.selected]: value === 2 })}
      />
    </BottomNavigation>
  );
}
