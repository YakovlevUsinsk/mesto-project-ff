
export function allCard(configApi) {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function dataGetProfile(configApi) {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function editProfileServer(configApi, data) {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify(data),
  })
    .then(checkResolveStatus)
}

export function addCardServer(configApi, data) {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify(data),
  })
    .then(checkResolveStatus)
}

export function deleteCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function likeCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function deleteLikeCardServer(configApi, idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function avatarEditServer(configApi, url) {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configApi.headers,
    body: JSON.stringify(url)
  })
    .then(checkResolveStatus)
}

function checkResolveStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
