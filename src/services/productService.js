import { Serverdomain } from "../config.js";

export default {
  getAll: async () => {
    console.log("service getAll is working!!!");
    console.log("Serverdomain", Serverdomain);
    return await fetch(`${Serverdomain}`, { cache: "no-cache" })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  register: async (email, password, name, gender, phone) => {
    const data = { email, password, gender, phone, name };
    console.log("data", data);
    return await fetch(`${Serverdomain}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  logIn: async (email, password) => {
    console.log("email", email);
    console.log("password", password);
    const data = { email, password };
    console.log("data", data);
    console.log("JSON.stringify(data)", JSON.stringify(data));
    return await fetch(`${Serverdomain}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  logOut: async logInStatus => {
    const data = { logInStatus };
    return await fetch(`${Serverdomain}/logout`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  forgotPassword: async email => {
    console.log("email", email);
    const data = { email };
    console.log("data", data, JSON.stringify(data));
    return await fetch(`${Serverdomain}/forgotpassword?email=${email}`, {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    })
      .then(res => console.log("forgetPassword res status", res.status))
      .catch(error => console.log("Error:", error));
  },
  modifiedPasswordGET: async token => {
    return await fetch(`${Serverdomain}/modifiedpassword?token=${token}`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  modifiedPasswordPOST: async (token, email, password) => {
    const data = { email, password };
    return await fetch(`${Serverdomain}/modifiedpassword?token=${token}`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  searchByKeyWord: async searchKeyWord => {
    return await fetch(`${Serverdomain}/search?searchKeyWord=${searchKeyWord}`, {
      method: "POST",
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  getAllCatrgory: async () => {
    return await fetch(`${Serverdomain}/getCategory`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  getRestaurantDetail: async (name, id) => {
    return await fetch(`${Serverdomain}/detail?name=${name}&_id=${id}`, { cache: "no-cache" })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  booking: async (date, time, adult, children, notes, restaurant_name, sessionStorageData) => {
    console.log("booking is working!!!", sessionStorageData);
    const timeString = `${time}:00`;
    const data = { date, timeString, adult, children, notes, restaurant_name, sessionStorageData };
    console.log("data", data);
    return await fetch(`${Serverdomain}/booking`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  getAllOrders: async userName => {
    return await fetch(`${Serverdomain}/orders?name=${userName}`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  getOrderDetails: async order_id => {
    console.log("service order_id", order_id);
    return await fetch(`${Serverdomain}/orderdetails?order_ID=${order_id}`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  saveModifiedOrderDetails: async (order_id, clickDate, time, adult, children, notes) => {
    const timeString = `${time}:00`;
    const data = { clickDate, timeString, adult, children, notes };
    console.log("save change order details data", data);
    return await fetch(`${Serverdomain}/orderdetails/save?order_ID=${order_id}`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  deleteOrderDetails: async order_id => {
    console.log(2, "delete order details service is working!!!");
    return await fetch(`${Serverdomain}/orderdetails/delete?order_ID=${order_id}`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  checkLogInStatus: async name => {
    return await fetch(`${Serverdomain}/checkLogInStatus?name=${name}`, {
      cache: "no-cache"
    })
      .then(res => console.log("check log in status", res))
      .catch(error => console.log("check log in status Error", error));
  },
  getRestaurantName: async _id => {
    return await fetch(`${Serverdomain}/restaurantName?_id=${_id}`, {
      cache: "no-cache"
    })
      .then(res => res.json())
      .catch(error => console.log("Error", error));
  }
};
