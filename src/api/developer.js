import request from "@/utils/request";

export function appleyDeveloper(comment) {
  return request({
    url: "/v1/dapp/apply-developer",
    method: "post",
    data: { comment: comment }
  });
}

export function getDeveloperInfo() {
  return request({
    url: "/v1/dapp/developer-info",
    method: "post",
    data: {}
  });
}

export function appleyDapp(data) {
  return request({
    url: "/v1/dapp/apply-dapp",
    method: "post",
    data: data
  });
}

export function editDapp(data) {
  return request({
    url: "/v1/dapp/edit-dapp",
    method: "post",
    data: data
  });
}

export function getDappDetail(id) {
  return request({
    url: "/v1/dapp/dapp-info",
    method: "post",
    data: { id: id }
  });
}

export function getDapps() {
  return request({
    url: "/v1/dapp/dapp-list",
    method: "post",
    data: {}
  });
}

export function publishDapp(id) {
  return request({
    url: "/v1/dapp/dapp-publish",
    method: "post",
    data: { id: id }
  });
}

export function getDappDevelopInfo(id) {
  return request({
    url: "/v1/dapp/dapp-develop-info",
    method: "post",
    data: { id: id }
  });
}

export function setDappPay(data) {
  return request({
    url: "/v1/dapp/edit-dapp-pay",
    method: "post",
    data: data
  });
}

export function getDappPay(id) {
  return request({
    url: "/v1/dapp/dapp-pay-info",
    method: "post",
    data: { dappId: id }
  });
}

export function tokenDown(data) {
  return request({
    url: "/v1/dapp/down",
    method: "post",
    data: data
  });
}

export function tokenDel(data) {
  return request({
    url: "/v1/dapp/delete",
    method: "post",
    data: data
  });
}

export function devDocFileList(data) {
  return request({
    url: "/v1/dapp/files-list",
    method: "post",
    data: data
  });
}

export function devDocFileAdd(data) {
  return request({
    url: "/v1/dapp/files-create",
    method: "post",
    data: data
  });
}

export function devDocFileEdit(data) {
  return request({
    url: "/v1/dapp/files-update",
    method: "post",
    data: data
  });
}

export function devDocFileDel(data) {
  return request({
    url: "/v1/dapp/files-delete",
    method: "post",
    data: data
  });
}