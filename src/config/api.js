import axios from "axios";

const RootPath = "https://dumbtickapi.herokuapp.com/api/v2";

const Get = path => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${RootPath}/${path}`).then(
      result => {
        resolve(result.data);
      },
      err => {
        reject(err);
      }
    );
  });
  return promise;
};

const Post = (path, data) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${RootPath}/${path}`, data).then(
      result => {
        resolve(result);
      },
      err => {
        reject(err);
      }
    );
  });
  return promise;
};

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
};

//POST
const postAddEvent = (data) => Post('event', data)

//GET
const getCategories = () => Get("categories");
const getEventByCategory = id => Get(`/category/${id}/event`);
const getEvents = () => Get("events");
const getEventById = id => Get(`event/${id}`);
const getLogin = () => Get("/login");
const getUserById = id => Get(`user/${id}`);
const getCategoryById = id => Get(`category/${id}`);
const getPayment = (id) => Get(`payment/${id}`)
const getApprovedPayment = (id) => Get(`/payment/ticket/${id}`)

const API = {
  getCategories,
  getEventByCategory,
  getEvents,
  getEventById,
  getLogin,
  getUserById,
  getCategoryById,
  postAddEvent,
  getPayment,
  getApprovedPayment
};

export default API;
