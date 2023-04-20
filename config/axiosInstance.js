import axios from "axios";
import { baseURL, testBaseURL } from "./endpoint";

export const INSTANCE = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",
  },
  // headers: {
  //   Authorization: localStorage.getItem("uToken"),
  // },
});
INSTANCE.interceptors.request.use((request) => {
  if (request.url === "auth/refresh-tokens") {
    return request;
  }
  return checkExpireToken(request);
});
INSTANCE.interceptors.response.use((response) => {
  // console.log("sdsd");
  return response;
});

export const insertToken = async (token) => {
  INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const checkExpireToken = (config) => {
  return executeSilentRefresh(config);
};

const executeSilentRefresh = async (config) => {
  function handleError(err) {
    // fail safe: delete auth header
    delete config.headers.Authorization;
    // return config;
    return (window.location.href = "/");
  }
  try {
    const token = localStorage.getItem("token");

    insertToken(token);
    // update tokens to redux store
    config.headers.Authorization = `Bearer ${token}`;

    return config;

    // else
  } catch (error) {
    return handleError(
      `Error: [${error.response.status || 500}] ${
        error.response.data.msg || "SERVER_ERROR"
      }`
    );
  }
};
