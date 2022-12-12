import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._textImagePopup = this._popup.querySelector('.popup__image-text');
    this._dataImagePopup = this._popup.querySelector('.popup__image');

  }

  open(data) {

    this._textImagePopup.textContent = data.place;
    this._dataImagePopup.src = data.link;
    this._dataImagePopup.alt = data.place;

    super.open();
  }
}
