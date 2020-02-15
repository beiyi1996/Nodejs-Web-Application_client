import React, { useState } from "react";
import { makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Header from "./Header";
import Logo from "../images/logo.png";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#719898" }
  }
});

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    height: "100%",
    "@media screen and (min-width: 600px)": {
      boxShadow: "1px 5px 15px 0px #DBDCE1"
    }
  },
  logoGrid: {
    marginTop: 50
  },
  logo: {
    // borderRadius: "50%"
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "250px"
    },
    display: "flex",
    flexDirection: "column"
  },
  formGrid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10
  },
  input: {
    margin: "10px auto",
    "& > div > input": {
      color: "#3D405B"
    }
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  logInOrRegister: {
    display: "flex",
    width: 150,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  button: {
    margin: "10px 0",
    fontFamily: "Microsoft JhengHei",
    border: "none"
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#719898"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#719898"
    }
  }
})(TextField);

function LogIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const history = useHistory();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleLogIn = async (email, password) => {
    const res = await productService.logIn(email, password);
    const currentTime = new Date().getTime();
    const user = Object.assign({}, res, { time: currentTime });
    const form = sessionStorage.getItem("form") !== null ? JSON.parse(sessionStorage.getItem("form")) : {};
    if (res.login) {
      sessionStorage.setItem("user", JSON.stringify(user));
      if (Object.keys(form).length > 0) {
        console.log("使用者之前有填寫過訂單, 但未登入, 被導到登入頁, 登入後要再幫他們導去訂購頁, 並且載入上次的內容!!");
        history.push("/booking");
      } else {
        history.push("/");
      }
    } else {
      if (res.code === 400) {
        const temporarily_email = res.email;
        console.log("temporarily_email", temporarily_email);
        sessionStorage.setItem("temporarily_email", temporarily_email);
        alert("此email並未註冊，請先註冊在登入喔!!");
        history.push("/register");
      } else if (res.code === 401) {
        setError(true);
      }
    }
  };

  const handleRegister = () => {
    console.log("handle register is working!!");
    history.push("/register");
  };

  const handleForgetPassword = () => {
    console.log("handleforgetpassword is working");
    if (email === "") {
      alert("請先填入註冊時的email");
    } else {
      history.push(`/forgotpassword?email=${email}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.logoGrid}>
          <img src={Logo} alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <CssTextField label="email" name="email" className={classes.input} onChange={handleEmailChange} />
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <MuiThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  error={error}
                />
              </MuiThemeProvider>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Grid item xs={12} className={classes.logInOrRegister}>
            <Button variant="outlined" className={classes.button} onClick={() => handleLogIn(email, values.password)}>
              登入
            </Button>{" "}
            |
            <Button variant="outlined" className={classes.button} onClick={handleRegister}>
              註冊
            </Button>
          </Grid>
          <Button variant="outlined" className={classes.button} onClick={handleForgetPassword}>
            忘記密碼
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LogIn;
