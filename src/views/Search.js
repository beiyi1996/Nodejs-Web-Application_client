import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import productService from '../services/productService'
import classNames from 'classnames'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Footer from './Footer'
import Header from './Header'
import Config from '../config'
import LazyLoad from 'react-lazyload'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    position: 'relative',
    height: '100vh',
    boxShadow: '1px 5px 15px 0px #DBDCE1',
  },
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'scroll',
  },
  grid: {
    width: '100%',
    margin: '2px 0',
    padding: 10,
    display: 'flex',
    position: 'sticky',
    top: 62,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    fontSize: 16,
    color: '#3D405B',
    border: '1px solid #B8B9C3',
    borderRadius: 20,
    width: '100%',
    padding: '5px 15px 5px',
    fontFamily: 'Microsoft JhengHei',

    '&:focus': {
      outline: 'none',
    },
  },
  searchIcon: {
    marginLeft: '-40px',
  },
  searchBtn: {
    borderRadius: 50,
    height: 40,
    minWidth: 40,
    padding: 5,
    '& > span > svg': {
      color: '#32354B',
    },
    '&:hover': {
      backgroundColor: '#FCF1DB',
    },
  },
  restaurantImage: {
    width: '75%',
    height: '100%',
    margin: '0 auto',
    '& > img': {
      width: '100%',
      borderRadius: 10,
    },
  },
  restaurantName: {
    paddingLeft: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    fontFamily: 'Microsoft JhengHei',
    fontSize: 17,
    margin: '0 0 5px',
    color: '#3D405B',
  },
  paperGrid: {
    position: 'relative',
    marginBottom: 70,
    '&:hover': {
      '& img': {
        opacity: 0.6,
        transition: 'opacity .3s ease-in-out',
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  paperRoot: {
    position: 'absolute',
    width: '80%',
    left: '50%',
    bottom: -15,
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    transform: 'translate(-50%)',
  },
  paperFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 5px',
  },
  chipDiv: {
    display: 'flex',
    fontFamily: 'Microsoft JhengHei',
    justifyContent: 'space-between',
    padding: 3,
  },
  chip: {
    display: 'inline-block',
    backgroundColor: '#E07A5F',
    color: '#fff',
    padding: '5px 0px',
    fontFamily: 'Microsoft JhengHei',
    marginRight: 3,
  },
  restaurantGrid: {
    paddingBottom: 70,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  keyWord: {
    fontFamily: 'Microsoft JhengHei',
    padding: '10px 10px 0px',
    color: '#3D405B',
    fontSize: 16,
    marginBottom: 24,
  },
  searchResultGrid: {
    position: 'absolute',
    zIndex: 1,
    width: '90%',
    left: 10,
  },
  saerchListItem: {
    padding: 10,
    backgroundColor: '#FEFDFC',
    border: '1px solid #B8B9C3',
    borderTop: 'none',
    width: '95%',
    margin: '0 auto',

    '& > p': {
      padding: 10,
      margin: '5px 0',
      fontFamily: 'Microsoft JhengHei',
      color: '#4E5169',
      '&:hover': {
        fontWeight: 'bold',
        backgroundColor: '#F6DAD3',
        cursor: 'pointer',
      },
    },
  },
  searchNone: {
    padding: 10,
    margin: '5px 0',
    fontFamily: 'Microsoft JhengHei',
    color: '#4E5169',
    fontWeight: 'normal',
    '&:hover': {
      fontWeight: 'inherit',
      backgroundColor: '#FEFDFC',
      cursor: 'default',
    },
  },
  urlParams: {
    color: '#E07A5F',
    fontWeight: 'bold',
  },
  searchNoResult: {
    padding: 10,
    fontFamily: 'Microsoft JhengHei',
    background: '#F9F7ED',
    textAlign: 'center',
    width: '80%',
    margin: '20px auto',
    color: '#E07A5F',
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

function Search() {
  const classes = useStyles()
  const [restaurant, setRestaurant] = useState(null)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [urlParams, setURLParams] = useState('')
  const [blur, setBlur] = useState(true)
  const history = useHistory()
  const url_params = new URLSearchParams(window.location.search)
  const keyWord = url_params.get('searchKeyWord')

  const getRestaurant = useCallback(async () => {
    setURLParams(keyWord)
    let res = await productService.searchByKeyWord(keyWord)
    if (Object.keys(res).length > 0) {
      setRestaurant(res.restaurants)
    }
  }, [keyWord])

  useEffect(() => {
    async function getRestaurantData() {
      await getRestaurant()
    }

    if (!restaurant) {
      getRestaurantData()
    }
  }, [getRestaurant, restaurant])

  useEffect(() => {
    setSearchKeyWord(keyWord)
    setURLParams(keyWord)
  }, [keyWord])

  useEffect(() => {
    let fetching = function () {}
    if (searchKeyWord) {
      fetching = async () => {
        const res = await productService.searchByKeyWord(searchKeyWord)
        if (res.restaurants.length > 0) {
          setSearchResult(res.restaurants)
          setRestaurant(res.restaurants)
        }
      }
      fetching()
    }
  }, [searchKeyWord])

  const handleSubmit = async () => {
    if (searchKeyWord.length > 0) {
      let res = await productService.searchByKeyWord(searchKeyWord)
      setURLParams(searchKeyWord)
      setRestaurant(res.restaurants)
      setBlur(true)
      history.push(`/search?searchKeyWord=${searchKeyWord}`)
    } else {
      alert('請輸入餐廳名稱或類別喲!!')
    }
  }

  const handleChange = (e) => {
    setSearchResult([])
    setBlur(false)
    setSearchKeyWord(e.target.value)
  }

  const handleClickItem = (item) => {
    setSearchKeyWord(item.name)
    setURLParams(item.name)
    setRestaurant([item])
    setBlur(true)
  }

  const renderSearchResult = () => {
    if (searchKeyWord.length > 0 && blur === false) {
      if (searchResult.length > 0) {
        const list = searchResult.map((item, idx) => (
          <p key={idx} onClick={() => handleClickItem(item)}>
            {item.name}
          </p>
        ))
        return <div className={classes.saerchListItem}>{list}</div>
      } else {
        return (
          <h4 className={classNames(classes.searchNone, classes.saerchListItem)}>抱歉, 沒有您想要搜尋的餐廳資訊!!</h4>
        )
      }
    }
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.grid}>
          <input
            type="text"
            name="searchbar"
            className={classes.searchBar}
            value={searchKeyWord}
            onChange={handleChange}
            placeholder="search for restaurant"
          />
          <div className={classes.searchIcon}>
            <Button className={classes.searchBtn} onClick={handleSubmit}>
              <SearchIcon />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.searchResultGrid}>
          {renderSearchResult()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom className={classes.keyWord}>
            為您推薦 <span className={classes.urlParams}>{urlParams}</span> 相關的餐廳 ..
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.restaurantGrid}>
          {restaurant && restaurant.length !== 0 ? (
            restaurant.map((item) => (
              <Link className={classes.paperGrid} key={item._id} to={`/detail?name=${item.name}&_id=${item._id}`}>
                <div className={classes.restaurantImage}>
                  <LazyLoad>
                    <img src={`${Config.Serverdomain}${item.image_path.main}`} alt="" />
                  </LazyLoad>
                </div>
                <Paper className={classes.paperRoot}>
                  <p className={classes.restaurantName}>{item.name}</p>
                  <div className={classes.paperFooter}>
                    <Typography component="div" className={classes.chipDiv}>
                      <Chip label={item.category.area} className={classes.chip} />
                      <Chip label={item.category.kind} className={classes.chip} />
                    </Typography>
                  </div>
                </Paper>
              </Link>
            ))
          ) : (
            <h2 className={classes.searchNoResult}>正在搜尋中...</h2>
          )}
        </Grid>
      </Grid>
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </Container>
  )
}

export default Search
