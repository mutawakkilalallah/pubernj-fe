import axios from "axios";
import { getLocalToken } from "../modules/storage";
import { swalError, swalSuccess, swalSuccessDelete } from "../modules/untils";

// const SERVER = "https://api.puber.phii.xyz";
const SERVER = "http://localhost:3004";
// const SERVER = "https://api-puber.nuruljadid.io";

const base = SERVER;

const api = axios.create({ baseURL: base });
api.defaults.headers.get.Accept = "applications/json";
api.defaults.headers.common["x-auth-token"] = getLocalToken();

const interceptResErrors = (err) => {
  try {
    swalError(
      err.response.data ? err.response.data : null,
      err.response.status
    );
  } catch (error) {}
  return Promise.reject(err);
};

const interceptResponse = (res) => {
  try {
    if (res.status === 204) {
      swalSuccessDelete();
    } else if (res.status === 200) {
      // swalSuccess(res.data.message);
    } else {
      swalSuccess(res.data.message);
    }
    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve(res);
  }
};
api.interceptors.response.use(interceptResponse, interceptResErrors);

/* Request Interceptors */
const interceptReqErrors = (err) => Promise.reject(err);
const interceptRequest = (config) => {
  return config;
};
api.interceptors.request.use(interceptRequest, interceptReqErrors);

export default ({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

const setToken = (token) => {
  api.defaults.headers.common["x-auth-token"] = token;
};
const deleteToken = () => delete api.defaults.headers.common["x-auth-token"];

export { axios, api, setToken, deleteToken };
