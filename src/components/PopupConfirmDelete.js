import { Popup } from "./Popup.js";
export class PopupConfirmDelete extends Popup {
  constructor(popupSelector, func) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._handleDeleteFromServer = func;
  }

  takeItHere(apiDelete) {
    this._handleDeleteFromServer = apiDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._handleDeleteFromServer)
      this._handleDeleteFromServer();
    })
    // this.close();
  }


}
