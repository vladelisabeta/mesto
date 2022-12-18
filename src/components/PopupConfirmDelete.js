import { Popup } from "./Popup.js";
export class PopupConfirmDelete extends Popup {
  constructor(popupSelector, func) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._handleDeleteFromServer = func;
  }

  createDelete(apiDelete) {
    this._handleDeleteFromServer = apiDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteFromServer();
    })
    // this.close();
  }


}
