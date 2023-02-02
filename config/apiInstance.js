import axios from "axios";
// require('dotenv').config();
// const apiUrl = process.env.REACT_APP_API_URL;

export default axios.create({
  // baseURL: "http://cnftgenie.io/",
  baseURL: "http://localhost:4001/",
  headers: {
    "Content-type": "application/json",
  },
});
