import request from "@/utils/request";
import { getToken } from "@/utils/auth"; // get token from cookie

export function login(uuid) {
  return request({
    url: "/v1/developer/loop-login",
    method: "post",
    data: { uuid: uuid }
  });
}

export function getInfo(token) {
  return request({
    url: "/v1/dapp/user-info",
    method: "post"
  });
}

export function logout() {
  return request({
    url: "/v1/dapp/logout",
    method: "get"
  });
}

export function preLogin() {
  return request({
    url: "/v1/developer/pre-login",
    method: "post"
  });
}

export function refreshToken() {
  const token = getToken();
  if (token) {
    return request({
      url: "/v1/developer/refresh",
      method: "post",
      data: { refresh: token.refresh }
    });
  } else {
    return new Promise(resolve => {
      resolve({ code: 1 });
    });
  }
}
