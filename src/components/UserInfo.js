export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;

    this._userName = document.querySelector(this._userNameSelector); // тут должен быть ДОМ элемент тайтла
    this._userAbout = document.querySelector(this._userAboutSelector); //тут должен быть ДОМ элемент описания
  }

  getUserInfo() {
    this._userInfo = {}

    this._userInfo.name = this._userName.textContent;
    this._userInfo.info = this._userAbout.textContent;

    return this._userInfo
  }

  setUserInfo(data) {
    data.info = data.about
    this._userName.textContent = data.name
    this._userAbout.textContent = data.info
  }

}



