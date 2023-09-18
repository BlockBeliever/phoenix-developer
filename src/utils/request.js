import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + store.getters.token.access;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.message === "invalid_grant"||res.message === "invalid access token") {
      // to re-login token 过期重新刷新
      // store.dispatch("user/resetToken").then(code => {
      //   if (code === 404) {
          MessageBox.alert("登陆失效，请重新登陆", {
            confirmButtonText: "重新登陆",
            type: "warning"
          })
            .then(() => {
              // location.reload();
              store.dispatch('user/refreshToken', "")
              store.dispatch('user/logout')
              router.push(`/login`)
            })
            .catch(() => {
              location.reload();
            });
      //   }
      // });
    }else if(res.code==0||res.status=="ok") {
      return res;
    }
     else if (res.code !== 0 ) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || "Error"));
    } 
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
