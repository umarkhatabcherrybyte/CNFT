import axios from "axios";
import { baseURL, testBaseURL } from "./endpoint";
// require('dotenv').config();
// const apiUrl = process.env.REACT_APP_API_URL;

export default axios.create({
  // baseURL: "http://cnftgenie.io/",
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
