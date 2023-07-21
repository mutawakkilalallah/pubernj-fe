// src/interceptors.js
import axios from 'axios';
import { getLocalToken } from '../modules/storage';
import {notifErr, notifSuccessVue} from '../modules/untils'

const SERVER = 'https://puber-api.kildev.my.id'
const base = SERVER
// const storageServer = SERVER + '/storage/'

const api = axios.create({ baseURL: base })
api.defaults.headers.get.Accept = 'applications/json'
api.defaults.headers.common['x-auth-token'] = getLocalToken()

const interceptResErrors = (err) => {
  try {
    console.log('errors interceptors', err.response);
    notifErr(err.response)
  } catch (error) {
    console.log(error);
  }
  return Promise.reject(err)
}

const interceptResponse = (res) => {
  try {
    console.log('ok', res);
    // notifSuccessVue(res)
    return Promise.resolve(res)
  } catch (error) {
    console.log(error);

    return Promise.resolve(res)
  }
}
api.interceptors.response.use(interceptResponse, interceptResErrors)

/* Request Interceptors */
const interceptReqErrors = err => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

export default (({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

const setToken = (token) => {
  api.defaults.headers.common['x-auth-token'] = token
}
const deleteToken = () => delete api.defaults.headers.common['x-auth-token']

export {axios, api, setToken, deleteToken};
