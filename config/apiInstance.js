import axios from "axios";
// require('dotenv').config();
// const apiUrl = process.env.REACT_APP_API_URL;

export default axios.create({
  // baseURL: "http://cnftgenie.io/",
  // baseURL: "http://192.168.100.64/api",
  baseURL: "http://localhost:4001/",
  headers: {
    "Content-type": "application/json",
  },
});
