import axios from "axios";
// require('dotenv').config();
// const apiUrl = process.env.REACT_APP_API_URL;

export default axios.create({
  // baseURL: "http://cnftgenie.io/",
  baseURL: "http://208.64.33.106:4001/api",
  headers: {
    "Content-type": "application/json",
  },
});
