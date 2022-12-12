
export class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  createCard() {
    this._cardElement = this._generateCard();

    this._imageCard = this._cardElement.querySelector('.card__image');
    this._buttonDelete = this._cardElement.querySelector('.card__trash');
    this._buttonLike = this._cardElement.querySelector('.card__heart');
    const nameCard = this._cardElement.querySelector('.card__title');

    nameCard.textContent = this._data.place;

    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.place;

    this._setEventListeners();

    return this._cardElement;
  }

  _generateCard() {
    const generatedCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return generatedCard
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
    this._buttonDelete = null;
    this._buttonLike = null;
    this._imageCard = null;
  }
}

