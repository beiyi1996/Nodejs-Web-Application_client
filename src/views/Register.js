import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
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
    height: "100vh",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    "@media screen and (max-width:360px)": {
      height: "100%"
    }
  },
  logo: {
    // borderRadius: "50%",
    marginTop: 50
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
    },
    "& > div > div > input": {
      color: "#3D405B"
    }
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "40%",
    margin: "5px 0",
    fontFamily: "Microsoft JhengHei",
    border: "none"
  },
  title: {
    textAlign: "left",
    display: "inline-block",
    width: "25%",
    color: "#719898"
  },
  radioInput: {
    flexDirection: "row",
    margin: "10px auto",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Microsoft JhengHei"
  },
  radio: {
    width: "38%",
    marginRight: 0,
    color: "#719898"
  },
  phoneLabel: {
    marginTop: "-30px",
    color: "#719898"
  },
  phoneInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  phone: {
    "& > div > input": {
      textAlign: "center"
    }
  },
  hide: {
    display: "none"
  },
  errorText: {
    color: "#E07A5F",
    fontFamily: "Microsoft JhengHei"
  },
  phoneErrorText: {
    color: "#E07A5F",
    lineHeight: "20px",
    textAlign: "center",
    marginTop: "-5px",
    fontFamily: "Microsoft JhengHei"
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#719898"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#719898"
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#f44336"
    }
  }
})(TextField);

function Register() {
  const classes = useStyles();
  const [phone, setPhone] = useState({
    phone1: "",
    phone2: "",
    phone3: ""
  });
  const [newValues, setNewValues] = useState({
    password: "",
    showPassword: false
  });
  const [gender, setGender] = useState("female");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [checkPasswordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const history = useHistory();

  const handleRedioChange = event => {
    setGender(event.target.value);
  };

  const handlePasswordChange = prop => event => {
    setNewValues({ ...newValues, [prop]: event.target.value });
    setPasswordError(false);
  };

  const handleClickShowPassword = () => {
    setNewValues({ ...newValues, showPassword: !newValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleChangeName = e => {
    setName(e.target.value);
    setNameError(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("temporarily_email")) {
      console.log("in if???");
      const temporarily_email = sessionStorage.getItem("temporarily_email");
      setEmail(temporarily_email);
    } else {
      console.log("沒有欲註冊的暫存帳號!");
    }
  }, []);

  const handleInputRegex = e => {
    e.target.value = e.target.value.replace(/[A-Za-z\u4e00-\u9fa5\s\D]/g, "");
    const name = e.target.name;
    console.log("name", name);
    setPhone({
      ...phone,
      [name]: e.target.value
    });
    setPhoneError(false);
  };

  const handleRegister = async (email, password, name, gender, phone) => {
    const genderNumber = gender === "male" ? 0 : 1;
    const allPhone = `${phone.phone1}-${phone.phone2}-${phone.phone3}`;
    console.log("allPhone", allPhone);
    if (email === "" || password === "" || name === "" || genderNumber === "" || allPhone === "") {
      alert("每個欄位都為必填欄位!! 請填寫完成再按下註冊按鈕, 謝謝!");
      setEmailError(true);
      setPasswordError(true);
      setNameError(true);
      setPhoneError(true);
    } else {
      const res = await productService.register(email, password, name, genderNumber, allPhone);
      console.log("res", res);
      if (res.code === 200) {
        sessionStorage.removeItem("temporarily_email");
        alert("您已註冊成功, 開始挑選您的食物吧!");
        history.push("/");
      } else if (res.code === 422) {
        alert("資料填寫有誤!");
        res.errors.map(item => {
          console.log("item", item);
          switch (item.param) {
            case "email":
              setEmailError(true);
              break;
            case "password":
              setPasswordError(true);
              break;
            case "name":
              setNameError(true);
              break;
            case "phone":
              setPhoneError(true);
              break;
            default:
              console.log("You do not have any error!!");
              break;
          }
          return console.log("You should done this form!!");
        });
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.paper}>
          <img src={Logo} alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <CssTextField
                label="email"
                name="email"
                onChange={handleChangeEmail}
                error={emailError}
                value={email || ""}
              />
              <FormHelperText
                className={clsx(classes.input, classes.errorText, { [classes.hide]: emailError === false })}
              >
                請填寫有效信箱! (simple@example.com)
              </FormHelperText>
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <MuiThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={newValues.showPassword ? "text" : "password"}
                  value={newValues.password}
                  onChange={handlePasswordChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {newValues.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  error={checkPasswordError}
                />
              </MuiThemeProvider>
              <FormHelperText
                className={clsx(classes.input, classes.errorText, { [classes.hide]: checkPasswordError === false })}
              >
                請輸入至少8碼!
              </FormHelperText>
            </FormControl>
            <CssTextField
              label="name"
              name="name"
              className={classes.input}
              onChange={handleChangeName}
              error={nameError}
            />
            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.radioInput}
              value={gender}
              onChange={handleRedioChange}
            >
              <MuiThemeProvider theme={theme}>
                <span className={classes.title}>gender</span>
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="男"
                  labelPlacement="end"
                  className={classes.radio}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="女"
                  labelPlacement="end"
                  className={classes.radio}
                />
              </MuiThemeProvider>
            </RadioGroup>
            <FormControl className={clsx(classes.input)}>
              <InputLabel className={classes.phoneLabel}>phone</InputLabel>
              <div className={classes.phoneInput}>
                <CssTextField
                  name="phone1"
                  className={clsx(classes.input, classes.phone)}
                  inputProps={{ maxLength: 4 }}
                  defaultValue="09"
                  onInput={handleInputRegex}
                  error={phoneError}
                />
                -
                <CssTextField
                  name="phone2"
                  className={clsx(classes.input, classes.phone)}
                  inputProps={{ maxLength: 3 }}
                  onInput={handleInputRegex}
                  error={phoneError}
                />
                -
                <CssTextField
                  name="phone3"
                  className={clsx(classes.input, classes.phone)}
                  inputProps={{ maxLength: 3 }}
                  onInput={handleInputRegex}
                  error={phoneError}
                />
              </div>
              <FormHelperText
                className={clsx(classes.input, classes.phoneErrorText, { [classes.hide]: phoneError === false })}
              >
                請輸入完整電話號碼! <br />
                (example: 0900-000-000)
              </FormHelperText>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => handleRegister(email, newValues.password, name, gender, phone)}
          >
            註冊
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
