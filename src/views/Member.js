import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import productService from '../services/productService'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Footer from './Footer'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    position: 'relative',
    height: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    '@media screen and (min-width: 700px)': {
      boxShadow: '1px 5px 15px 0px #DBDCE1',
    },
  },
  container: {
    height: '100%',
  },
  userPicGrid: {
    marginTop: 50,
  },
  userPic: {
    borderRadius: '50%',
  },
  userGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 20px',
  },
  userPaper: {
    width: '50%',
    '&:first-child': {
      borderBottomRightRadius: 0,
    },
    '&:last-child': {
      borderBottomLeftRadius: 0,
    },
    '& > h6': {
      fontFamily: 'Microsoft JhengHei',
      color: '#3D405B',
    },
  },
  userDetails: {
    textAlign: 'left',
    padding: '0 20px',
    height: 'calc(100% - 56px)',
    '& > *': {
      fontFamily: 'Microsoft JhengHei',
    },
  },
  orders: {
    marginTop: 20,
    maxHeight: 'calc(100% - 56px)',
    overflow: 'scroll',
    paddingBottom: 60,
    '& > *': {
      fontFamily: 'Microsoft JhengHei',
    },
  },
  orderCards: {
    margin: '10px 0',
    '& > *': {
      fontFamily: 'Microsoft JhengHei',
    },
    '& > a': {
      textDecoration: 'none',
    },
  },
  cardButton: {
    width: '100%',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#FEFAF4',
    },
  },
  cardContent: {
    '& > *': {
      fontFamily: 'Microsoft JhengHei',
    },
  },
  cardTitle: {
    color: '#E07A5F',
  },
  cardContents: {
    color: '#717487',
  },
  nonOrders: {
    padding: 20,
  },
  footerDiv: {
    position: 'absolute',
    bottom: 0,
    width: 'inherit',
    '& > div': {
      position: 'static',
    },
  },
}))

function Member() {
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [userName, setUserName] = useState('')
  const [orderCount, setOrderCount] = useState(0)
  const [userEmail, setUserEmail] = useState('')
  const [isLogIn, setIsLogIn] = useState(true)
  const [userPhotoText, setUserPhotoText] = useState('')
  const history = useHistory()

  const getMemberDetails = useCallback(async () => {
    const sessionStorageData = sessionStorage.getItem('user') !== null ? JSON.parse(sessionStorage.getItem('user')) : {}
    const orders = await productService.getAllOrders(sessionStorageData.member)
    const userPhotoText = Object.keys(sessionStorageData).length > 0 ? sessionStorageData.member[0].toUpperCase() : ''
    setUserPhotoText(userPhotoText)

    if (orders.code === 200) {
      const promises = orders.orders.map((item) => {
        return new Promise((resolve, reject) => {
          const restaurantNamePromise = new Promise((resolve, reject) => {
            const restaurantNameResult = productService.getRestaurantName(item.restaurant_id)
            resolve(restaurantNameResult)
          })
          restaurantNamePromise.then((value) => {
            item.restaurantName = value.restaurantName
            const dateTime = new Date(item.dateTime)
            const forTemporaryMonth =
              dateTime.getMonth() + 1 > 9 ? dateTime.getMonth() + 1 : `0${dateTime.getMonth() + 1}`
            const forTemporaryDate = dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`
            const date = `${dateTime.getFullYear()} / ${forTemporaryMonth} / ${forTemporaryDate}`
            const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : `0${dateTime.getMinutes()}`
            const time = `${dateTime.getHours()} : ${minutes}`
            item.date = date
            item.time = time
            resolve(item)
          })
        })
      })

      Promise.all(promises).then(function (results) {
        setOrders(results)
      })

      setIsLogIn(true)
      setUserName(sessionStorageData.member)
      setUserEmail(sessionStorageData.email)
      setOrderCount(orders.orders.length)
    } else {
      sessionStorage.removeItem('user')
      const routeLogIn = window.confirm('您上未登入, 需要將您導至登入頁嗎?')
      if (routeLogIn) {
        setIsLogIn(false)
        history.push('/login')
      } else {
        setIsLogIn(true)
        setUserName('')
        setOrders([])
        setOrderCount(0)
        setUserEmail('')
      }
    }
  }, [history])

  useEffect(() => {
    async function didMountWork() {
      await getMemberDetails()
    }
    didMountWork()
  }, [getMemberDetails])

  const handleClickOrderDetails = (_id) => {
    history.push(`/orderdetails?order_ID=${_id}`)
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        {isLogIn ? <Header /> : <></>}
        <Grid item xs={12} className={classes.userPicGrid}>
          <img
            src={`http://fakeimg.pl/100x100/F4D28B/3D405B/?text=${userPhotoText}&font=bebas`}
            alt=""
            className={classes.userPic}
          />
        </Grid>
        <Grid item xs={12} className={classes.userGrid}>
          <Paper className={classes.userPaper}>
            <Typography variant="h6">Name</Typography>
            <Typography variant="subtitle1">{userName}</Typography>
          </Paper>
          <Paper className={classes.userPaper}>
            <Typography variant="h6">訂單總數</Typography>
            <Typography variant="subtitle1">{orderCount}筆</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.userDetails}>
          <Typography variant="h6">電子郵件地址 : {userEmail}</Typography>
          <Typography variant="h6">最近訂單:</Typography>
          <Grid item xs={12} className={classes.orders}>
            {orders.length > 0 ? (
              orders.map((item) => {
                return (
                  <Card className={classes.orderCards} key={item._id} onClick={() => handleClickOrderDetails(item._id)}>
                    <Button className={classes.cardButton}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom className={classes.cardTitle} variant="h6">
                          訂位時間: {item.date} - {item.time}
                        </Typography>
                        <Typography variant="body2" className={classes.cardContents} component="p">
                          餐廳名稱 : {item.restaurantName} | 人數 : {item.adult} 位大人, {item.children}位小孩
                        </Typography>
                      </CardContent>
                    </Button>
                  </Card>
                )
              })
            ) : (
              <Paper className={classes.nonOrders}>目前還沒有任何訂單喲!!</Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.footerDiv}>
        <Footer selectedValue={2} />
      </div>
    </Container>
  )
}

export default Member
