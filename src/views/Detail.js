import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import productService from '../services/productService'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Footer from './Footer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GoogleApiWrapper from '../googleMap.js'
import classNames from 'classnames'
import Header from './Header'
import Config from '../config'
import LazyLoad from 'react-lazyload'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    boxShadow: '1px 5px 15px 0px #DBDCE1',
    position: 'relative',
    height: '100vh',
    '& > *': {
      fontFamily: 'Microsoft JhengHei',
    },
  },
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'scroll',
  },
  grid: {
    width: '100%',
    padding: '10px',
    margin: '2px 0',
    display: 'flex',
    position: 'sticky',
    zIndex: 1,
    top: 62,
    backgroundColor: '#fff',
  },
  searchBar: {
    fontSize: 16,
    color: '#3D405B',
    border: '1px solid #B8B9C3',
    borderRadius: 20,
    width: '100%',
    padding: '5px 15px 5px',

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
    width: '100%',
    borderRadius: 10,
    '& > img': {
      width: '100%',
      height: 200,
      '@media screen and (min-width:768px)': {
        height: 300,
      },
    },
  },
  restaurantName: {
    paddingLeft: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    fontFamily: 'Microsoft JhengHei',
    fontSize: 22,
    fontWeight: 600,
    margin: '0 0 5px',
    color: '#638585',
  },
  restaurantContent: {
    paddingBottom: 55,
  },
  paperGrid: {
    position: 'relative',
    padding: '0 20px',
    '@media screen and (min-width:768px)': {
      display: 'flex',
      '& > div': {
        width: '50%',
      },
    },
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  detailList: {
    listStyle: 'none',
    paddingLeft: 10,
    fontFamily: 'Microsoft JhengHei',

    '& > li': {
      margin: '5px 0',
    },
  },
  title: {
    display: 'inline-block',
    width: '100%',
    color: '#838596',
    fontSize: 14,
  },
  content: {
    display: 'inline-block',
    color: '#4E5169',
    margin: '8px 0 15px',
  },
  googleMap: {
    padding: '0 5px',
    minHeight: 150,
    border: '1px solid #B8B9C3',
    marginTop: 15,
    position: 'relative',
  },
  mapStyles: {
    height: '100%',
    width: '100%',
  },
  map: {
    height: '30vh',
    width: '100%',
    '@media screen and (min-width:768px)': {
      height: '100%',
    },
  },
  paperFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    margin: '10px 0 5px',
    boxSizing: 'border-box',
  },
  booking: {
    width: '50%',
    borderRadius: 8,
    border: '1px solid #4E5169',
    fontFamily: 'Microsoft JhengHei',
    margin: '24px auto',
    display: 'inline-block',
    textDecoration: 'none',
    textAlign: 'center',
    color: '#4E5169',
    padding: '8px 0',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#FCF1DB',
      borderColor: '#E0A015',
    },
  },
  slider: {
    '& > button::before': {
      color: '#FCF1DB',

      '&:hover': {
        color: '#3D405B',
      },
    },
    '& > button:first-child': {
      left: 0,
      zIndex: 1,
    },
    '& > button:first-child ~ button': {
      right: 0,
    },
    '& > ul': {
      display: 'none !important',
    },
  },
  searchResultGrid: {
    position: 'absolute',
    zIndex: 2,
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
  noFetchResult: {
    padding: 20,
    backgroundColor: '#F9F7ED',
    fontFamily: 'Microsoft JhengHei',
    color: '#E07A5F',
    margin: '0 auto',
    width: '80%',
    textAlign: 'center',
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

function Detail() {
  const classes = useStyles()
  const [form, setForm] = useState(null)
  const [queryName, setQueryName] = useState('')
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [blur, setBlur] = useState(true)
  const [restaurantName, setRestaurantName] = useState('')
  const [noFetchResult, setNoFetchResult] = useState(false)
  const [mapProps, setMapProps] = useState({
    center: {
      lat: 23.9217605,
      lng: 120.64579,
    },
    zoom: 15,
    name: '',
    address: '',
  })
  const mapRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    if (searchKeyWord) {
      async function fetching() {
        let res = await productService.searchByKeyWord(searchKeyWord)
        if (res.restaurants.length > 0) {
          setSearchResult(res.restaurants)
        }
      }
      fetching()
    }
  }, [searchKeyWord])

  useEffect(() => {
    async function getRestaurantData() {
      const mapProps = {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 15,
        name: '',
        address: '',
      }
      const restaurantResult = await getRestaurantDetail()
      if (restaurantResult.code === 200) {
        setMapProps({
          ...mapProps,
          address: restaurantResult.restaurant.address,
          name: restaurantResult.restaurant.name,
        })
        setNoFetchResult(false)
      } else {
        setNoFetchResult(true)
        return
      }
    }

    getRestaurantData()
  }, [])

  const getRestaurantDetail = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('name')
    const _id = urlParams.get('_id')
    const res = await productService.getRestaurantDetail(name, _id)
    setRestaurantName(name)
    setQueryName(name)
    if (res.code === 200) {
      setForm({
        name: name,
        address: res.restaurant.address,
        phone: res.restaurant.phone,
        info: res.restaurant.info,
        image_path: res.restaurant.image_path,
      })
    } else if (res.code === 400) {
      setForm(null)
    }

    return res
  }

  const SimpleSlider = ({ image_path }) => {
    const classes = useStyles()
    let settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings} className={classes.slider}>
        <div className={classes.restaurantImage}>
          <LazyLoad>
            <img src={`${Config.Serverdomain}/${image_path.main}`} alt="" />
          </LazyLoad>
        </div>
        {image_path.products.map((item, idx) => {
          return (
            <div className={classes.restaurantImage} key={idx}>
              <LazyLoad>
                <img src={`${Config.Serverdomain}/${item}`} alt="" />
              </LazyLoad>
            </div>
          )
        })}
      </Slider>
    )
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

  const handleSubmit = async () => {
    setQueryName(searchKeyWord)
    setBlur(true)
    history.push(`/search?searchKeyWord=${searchKeyWord}`)
  }

  const handleClickItem = (item) => {
    setSearchKeyWord(item.name)
    setQueryName(item.name)
    setBlur(true)
  }

  const handleChange = (e) => {
    setSearchResult([])
    setBlur(false)
    setSearchKeyWord(e.target.value)
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
            <Button className={classes.searchBtn}>
              <SearchIcon className={classes.icon} onClick={handleSubmit} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.searchResultGrid}>
          {renderSearchResult()}
        </Grid>
        {noFetchResult ? (
          <h3 className={classes.noFetchResult}>
            很抱歉, 沒有您想要吃的餐廳!! 可以在左邊選選取您有興趣的餐廳種類喲!!!
          </h3>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.restaurantName}>
                {form ? form.name : queryName}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.restaurantContent}>
              <Grid item xs={12} className={classes.paperGrid}>
                <div>
                  <div className={classes.restaurantImage}>
                    {form ? <SimpleSlider image_path={form.image_path} /> : <></>}
                  </div>
                  <Paper className={classes.paperRoot}>
                    <ul className={classes.detailList}>
                      <li>
                        <span className={classes.title}>店家名稱 : </span>
                        <span className={classes.content}>{form ? form.name : ''}</span>
                      </li>
                      <li>
                        <span className={classes.title}>地址 : </span>
                        <span className={classes.content}>{form ? form.address : ''}</span>
                      </li>
                      <li>
                        <span className={classes.title}>電話 : </span>
                        <span className={classes.content}>{form ? form.phone : ''}</span>
                      </li>
                      <li>
                        <span className={classes.title}>用餐時間 : </span>
                        <span className={classes.content}>10:00 – 21:30</span>
                      </li>
                      <li>
                        <span className={classes.title}>店家描述 : </span>
                        <span className={classes.content}>{form ? form.info : ''}</span>
                      </li>
                      <li>
                        <span className={classes.title}>保留資訊 : </span>
                        <span className={classes.content}>將為您保留訂位10分鐘, 若10分鐘過後仍未到場, 即取消訂位!</span>
                      </li>
                      <li>
                        <span className={classes.title}>最低消費 : </span>
                        <span className={classes.content}>每位顧客最低消費為180元。</span>
                      </li>
                    </ul>
                  </Paper>
                </div>
                <div className={classes.googleMap} id="map" ref={mapRef}>
                  <GoogleApiWrapper mapProps={mapProps} />
                </div>
              </Grid>
              <div className={classes.paperFooter}>
                <Link to={`/booking?restaurantName=${restaurantName}`} className={classes.booking}>
                  我要訂位
                </Link>
              </div>
            </Grid>
          </>
        )}
      </Grid>
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </Container>
  )
}

export default Detail
