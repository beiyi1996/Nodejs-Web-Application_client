import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import GithubIcon from "../images/github-big-logo.png";
import CodepenIcon from "../images/codepen.png";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import Footer from "./Footer";
import Winni from "../images/winni.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    boxShadow: "1px 5px 15px 0px #DBDCE1"
  },
  container: {
    textAlign: "center",
    height: "100vh",
    position: "relative",
    "& > *": {
      color: "#3D405B"
    }
  },
  logoGrid: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    alignItems: "center"
  },
  logo: {
    borderRadius: "10%",
    width: 200,
    height: 250
  },
  formGrid: {
    width: "100%",
    margin: "0 auto",
    padding: 10
  },
  aTagIcon: {
    color: "#6C6C6C",
    display: "inline-block",
    height: 24
  },
  iconImg: {
    width: 22
  },
  introduction: {
    padding: 20,
    overflow: "scroll",
    "& > div": {
      padding: 20,
      "& > p": {
        textAlign: "left"
      }
    },
    "& > div > *": {
      fontFamily: "Microsoft JhengHei"
    },
    "@media screen and (max-width:360px)": {
      height: "calc(50% - 180px)"
    },
    "@media screen and (min-width:375px)": {
      height: "calc(50% - 140px)"
    },
    "@media screen and (min-width:768px)": {
      height: "auto"
    }
  },
  logInOrRegister: {
    display: "flex",
    width: 150,
    justifyContent: "space-evenly",
    alignItems: "center"
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

function ContactMe() {
  const classes = useStyles();

  const handleClickGitHubButton = () => {
    console.log("clicked github button");
  };

  const handleClickCodePenButton = () => {
    console.log("clicked codepen button");
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.logoGrid}>
          <img src={Winni} alt="" className={classes.logo} />
          <Grid item xs={12} className={classes.formGrid}>
            <Typography variant="h4">Winni Huang</Typography>
            <Grid item xs={12}>
              <IconButton aria-label="phone">
                <a href="tel:0955822647" className={classes.aTagIcon}>
                  <PhoneRoundedIcon />
                </a>
              </IconButton>
              <IconButton aria-label="email">
                <a href="mailto:usj0326@gmail.com" className={classes.aTagIcon}>
                  <EmailRoundedIcon />
                </a>
              </IconButton>
              <IconButton aria-label="github" onClick={handleClickGitHubButton}>
                <a href="https://github.com/beiyi1996" className={classes.aTagIcon}>
                  <img src={GithubIcon} alt="" className={classes.iconImg} />
                </a>
              </IconButton>
              <IconButton aria-label="codepen" onClick={handleClickCodePenButton}>
                <a href="https://codepen.io/beiyi1996/pens/public" className={classes.aTagIcon}>
                  <img src={CodepenIcon} alt="" className={classes.iconImg} />
                </a>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.introduction}>
          <Paper>
            <Typography variant="h5">樂觀開朗，勇於挑戰。</Typography>
            <Typography variant="body1">
              在大學的最後一個學期，決定加入Build School，培養自己的第二專長。並且在2018/06月底參加企業專題，使用 VSTS
              及 Scurm 與4位組員偕同開發 Bot Designer 專案。
              <br />
              畢業之後，在雄獅資訊科技公司-票券當地遊組擔任前端工程師一職1年半的時間，
              <br />
              每當我在開發時，總是會特別激進，使用官方文件搭配網路文章的方法，進行一次又一次的嘗試，直到解出來為止!!
              完成功能的瞬間，讓我感到無比的成就感，同時將新學到的方法或知識與身邊的人分享，
              <br />
              想要了解更全面的我，可以透過名字下方的按鈕與我聯繫，謝謝。
            </Typography>
          </Paper>
        </Grid>
        <div className={classes.footerDiv}>
          <Footer />
        </div>
      </Grid>
    </Container>
  );
}

export default ContactMe;
