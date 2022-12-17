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


  addCardToServer(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link,
        likes: data.likes,
        _id: data._id
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты не добавил карточку, лох`) }
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты не добавил карточку, лох`) }
      })
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты не добавил карточку, лох`) }
      })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else { Promise.reject(`Ошибка: ${res.status} ты не добавил карточку, лох`) }
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
