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
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  App: {
    "& > div": {
      padding: 0
    }
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/detail" component={Detail} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LogIn} />
        <Route path="/booking" component={Booking} />
        <Route path="/orders" component={Order} />
        <Route path="/orderdetails" component={OrderDetails} />
        <Route path="/completed" component={Completed} />
        <Route path="/modifiedpassword" component={ModifiedPassword} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/member" component={Member} />
        <Route path="/contactme" component={ContactMe} />
      </Switch>
    </div>
  );
}

export default App;
