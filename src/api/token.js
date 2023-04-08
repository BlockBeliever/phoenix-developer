import request from "@/utils/request";

export function generateToken(data) {
  return request({
    url: "/v1/dapp/generate-token",
    method: "post",
    data: data
  });
}

export function getTokens() {
  return request({
    url: "/v1/dapp/tokens",
    method: "post",
    data: {}
  });
}

export function getTokenIssues(id) {
  return request({
    url: "/v1/dapp/issue-list",
    method: "post",
    data: { tokenId: id }
  });
}

export function approveIssues(id, status) {
  return request({
    url: "/v1/dapp/approve-issue",
    method: "post",
    data: { id: id, status: status }
  });
}

export function issueToken(data) {
  return request({
    url: "/v1/dapp/issue",
    method: "post",
    data: data
  });
}

