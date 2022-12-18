export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector

    this._userName = document.querySelector(this._userNameSelector); // тут должен быть ДОМ элемент тайтла
    this._userAbout = document.querySelector(this._userAboutSelector); //тут должен быть ДОМ элемент описания
    this._userAvatar = document.querySelector(this._userAvatarSelector);

    console.log(this._userAvatar)

  }

  getUserInfo() {
    this._userInfo = {}

    this._userInfo.name = this._userName.textContent;
    this._userInfo.info = this._userAbout.textContent;

    return this._userInfo
  }

  setUserInfo(data) {

    this._userName.textContent = data.name
    this._userAbout.textContent = data.info
  }

  updateUserAvatar(data) {

    this._userAvatar.src = data.avatar
  }


}



