export class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }



  //  это дисент
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты профильный лох`) }
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты карточный лох`) }
      })
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты полупрофильный лох`) }
      })
  }



}


// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
//   headers: {
//     authorization: '164f802e-3ded-431e-9f1e-8df3253cf571',
//     'Content-Type': 'application/json'
//   }
// });
