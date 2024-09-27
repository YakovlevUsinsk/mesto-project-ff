const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: '524b66f3-5145-414f-bd77-15a854ae63ff',
    'Content-Type': 'application/json'
  },
}

export function allCard() {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function dataGetProfile() {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function editProfileServer(data) {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify(data),
  })
    .then(checkResolveStatus)
}

export function addCardServer(data) {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify(data),
  })
    .then(checkResolveStatus)
}

export function deleteCardServer(idCard) {
  return fetch(`${configApi.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function likeCardServer(idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function deleteLikeCardServer(idCard) {
  return fetch(`${configApi.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(checkResolveStatus)
}

export function avatarEditServer(url) {
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
