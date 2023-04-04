import Cookies from "js-cookie";

const TokenKey = "AccessToken";

export function getToken() {
  var token = localStorage.getItem(TokenKey);
  if (typeof token != "undefined") {
    return JSON.parse(token);
  }
  return false;
}

export function setToken(token) {
  if (token != "") {
    token = JSON.stringify(token);
  }
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
