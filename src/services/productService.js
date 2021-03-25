import { Serverdomain } from '../config.js'

const API = {
  getAll: async () => {
    return await fetch(`${Serverdomain}`, { cache: 'no-cache' })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
  },
  register: async (email, password, name, gender, phone) => {
    const data = { email, password, gender, phone, name }
    return await fetch(`${Serverdomain}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
  },
  logIn: async (email, password) => {
    const data = { email, password }
    return await fetch(`${Serverdomain}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
  },
  logOut: async (logInStatus) => {
    const data = { logInStatus }
    return await fetch(`${Serverdomain}/logout`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  forgotPassword: async (email) => {
    const data = { email }
    return await fetch(`${Serverdomain}/forgotpassword?email=${email}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    })
      .then((res) => console.log('forgetPassword res status', res.status))
      .catch((error) => console.log('Error:', error))
  },
  modifyPassword: async (token) => {
    return await fetch(`${Serverdomain}/modifypassword?token=${token}`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  changePassword: async (token, email, password) => {
    const data = { email, password }
    return await fetch(`${Serverdomain}/changepassword?token=${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  searchByKeyWord: async (searchKeyWord) => {
    return await fetch(`${Serverdomain}/search?searchKeyWord=${searchKeyWord}`, {
      method: 'POST',
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
  },
  getAllCatrgory: async () => {
    return await fetch(`${Serverdomain}/getCategory`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  getRestaurantDetail: async (name, id) => {
    return await fetch(`${Serverdomain}/detail?name=${name}&_id=${id}`, { cache: 'no-cache' })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
  },
  booking: async (date, time, adult, children, notes, restaurant_name, sessionStorageData) => {
    const timeString = `${time}:00`
    const data = { date, timeString, adult, children, notes, restaurant_name, sessionStorageData }
    return await fetch(`${Serverdomain}/booking`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  getAllOrders: async (userName) => {
    return await fetch(`${Serverdomain}/orders?name=${userName}`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  getOrderDetails: async (order_id) => {
    return await fetch(`${Serverdomain}/orderdetails?order_ID=${order_id}`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  saveModifiedOrderDetails: async (order_id, clickDate, time, adult, children, notes) => {
    const timeString = `${time}:00`
    const data = { clickDate, timeString, adult, children, notes }
    return await fetch(`${Serverdomain}/orderdetails/save?order_ID=${order_id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  deleteOrderDetails: async (order_id) => {
    return await fetch(`${Serverdomain}/orderdetails/delete?order_ID=${order_id}`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error))
  },
  checkLogInStatus: async (name) => {
    return await fetch(`${Serverdomain}/checkLogInStatus?name=${name}`, {
      cache: 'no-cache',
    })
      .then((res) => console.log('check log in status', res))
      .catch((error) => console.log('check log in status Error', error))
  },
  getRestaurantName: async (_id) => {
    return await fetch(`${Serverdomain}/restaurantName?_id=${_id}`, {
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error', error))
  },
}

export default API
