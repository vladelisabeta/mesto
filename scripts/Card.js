import { popupImage, openPopup } from './generalData.js'

export class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._cardElement = document
      .querySelector(templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._imageCard = this._cardElement.querySelector('.card__image');
    this._buttonDelete = this._cardElement.querySelector('.card__trash');
    this._buttonLike = this._cardElement.querySelector('.card__heart');
  }

  createCard() {
    const nameCard = this._cardElement.querySelector('.card__title');
    nameCard.textContent = this._data.name;

    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._buttonLike.addEventListener('click', () => this._pressLike());
    this._imageCard.addEventListener('click', () => this._openImagePopup(this._data));
  }

  _pressLike() {
    this._buttonLike.classList.toggle('card__heart_active');
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openImagePopup(data) {
    const textImagePopup = popupImage.querySelector('.popup__image-text');
    const dataImagePopup = popupImage.querySelector('.popup__image');

    textImagePopup.textContent = data.name;
    dataImagePopup.src = data.link;
    dataImagePopup.alt = data.name;
    openPopup(popupImage);
  }
}
