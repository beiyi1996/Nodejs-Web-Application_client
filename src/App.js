import React from "react";
import Home from "./views/Home";
import Completed from "./views/Completed";
import LogIn from "./views/LogIn";
import Register from "./views/Register";
import ModifiedPassword from "./views/ModifiedPassword";
import ForgotPassword from "./views/ForgotPassword";
import Search from "./views/Search";
import Detail from "./views/Detail";
import Booking from "./views/Booking";
import OrderDetails from "./views/OrderDtails";
import Order from "./views/Oreder";
import Member from "./views/Member";
import ContactMe from "./views/ContactMe";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  App: {
    "& > div": {
      padding: 0
    }
  }
}));

function App() {
  console.log("app init");
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/orders">
            <Order />
          </Route>
          <Route path="/orderdetails">
            <OrderDetails />
          </Route>
          <Route path="/completed">
            <Completed />
          </Route>
          <Route path="/modifiedpassword">
            <ModifiedPassword />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/member">
            <Member />
          </Route>
          <Route path="/contactme">
            <ContactMe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
