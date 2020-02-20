import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import productService from "../services/productService";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      margin: "0",
      padding: "0"
    },
    "*::-webkit-scrollbar": {
      width: "0em",
      height: "8px"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(155, 208, 208, .5)",
      outline: "1px solid slategrey",
      borderRadius: "15px"
    }
  },
  item: {
    padding: "10px",
    overflow: "hidden"
  },
  title: {
    fontSize: 18,
    flexGrow: 1,
    textAlign: "center"
  },
  appBar: {
    backgroundColor: "#9BD0D0",
    color: "#3D405B",
    position: "sticky",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuItem: {
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& > div": {
      left: "auto"
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  linkBtn: {
    textDecoration: "none"
  },
  listItems: {
    "& > span": {
      fontFamily: "Microsoft JhengHei",
      color: "#3D405B"
    }
  },
  summary: {
    padding: "0 24px 0 16px"
  },
  menuHeader: {
    textDecoration: "none",
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B",
    "& > div > div > span": {
      fontFamily: "Microsoft JhengHei",
      color: "#3D405B"
    }
  },
  details: {
    padding: "0"
  },
  list: {
    width: "100%"
  }
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [restaurant, setrestaurant] = useState(null);
  const [showLogInButton, setShowLogInButton] = useState(true);
  const [session_storage, setSessionStorage] = useState({});
  const openU = Boolean(anchorEl);
  const history = useHistory();
  const listItem = [
    { title: "查看訂單", href: `/orders?name=${session_storage.member}` },
    { title: "首頁", href: "/" },
    { title: "關於作者", href: "/contactme" }
  ];

  useEffect(() => {
    console.log("Header useEffect is working!!");
    console.log("sessionStorage", JSON.parse(sessionStorage.getItem("user")));
    const sessionStorageData =
      sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    if (!restaurant) {
      getRestaurant();
    }
    if (Object.keys(sessionStorageData).length > 0) {
      console.log("有sessionStorage , 表示已登入");
      setSessionStorage(sessionStorageData);
      setShowLogInButton(false);
    } else {
      setShowLogInButton(true);
    }
  }, [restaurant]);

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleCheckOrderDetails = async () => {
    const sessionStorageData = JSON.parse(sessionStorage.getItem("user"));
    console.log(8390, "sessionStorageData", sessionStorageData);
    const res = await productService.getAllOrders(sessionStorageData.member);
    console.log("handle check order details res", res);
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user", user);
    handleClose();
    history.push(`/orders?name=${user.member}`);
  };

  const handleLogOut = async () => {
    const res = await productService.logOut(session_storage.login);
    console.log("log out res", res);
    if (res.code === 200) {
      sessionStorage.clear();
      setShowLogInButton(true);
      alert("已將您的帳號登出!");
      handleClose();
      history.push("/");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Gourmand
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-list-grow"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={openU}
              onClose={handleClose}
            >
              {showLogInButton ? (
                <MenuItem onClick={handleLogIn} className={classes.menuItem}>
                  登入
                </MenuItem>
              ) : (
                <div>
                  <MenuItem className={classes.menuItem}>Hi! {session_storage.member}</MenuItem>
                  <MenuItem onClick={handleCheckOrderDetails} className={classes.menuItem}>
                    查詢訂單
                  </MenuItem>
                  <MenuItem onClick={handleLogOut} className={classes.menuItem}>
                    登出
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<KeyboardArrowDownRoundedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.summary}
          >
            <Typography className={classes.menuHeader}>餐廳分類</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <List className={classes.list}>
              {restaurant ? (
                restaurant.distinctByKind.map((kind, idx) => {
                  return (
                    <Link
                      to={`/search?searchKeyWord=${kind}`}
                      key={idx}
                      className={classes.linkBtn}
                      onClick={handleDrawerClose}
                    >
                      <ListItem button>
                        <ListItemText primary={kind} className={classes.listItems} />
                      </ListItem>
                    </Link>
                  );
                })
              ) : (
                <p>NONONO</p>
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <List>
          {listItem.map((item, index) => (
            <Link to={item.href} key={index} className={classes.menuHeader}>
              <ListItem button>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Header;
