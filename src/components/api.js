export function allCard(configApi) {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  }).then((res) => {
    return res.json();
  });
}

export function dataGetProfile(configApi) {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  }).then((res) => {
    return res.json();
  });
}

export function editProfileServer(configApi, data) {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}

export function addCardServer(configApi, data) {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}

export function deleteCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  });
}

export function likeCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: configApi.headers,
  }).then((res) => {
    return res.json();
  });
}

export function deleteLikeCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => {
    return res.json();
  });
}