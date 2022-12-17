
export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;

  }

  createCard() {
    this._cardElement = this._generateCard();

    this._imageCard = this._cardElement.querySelector('.card__image');
    this._buttonDelete = this._cardElement.querySelector('.card__trash');
    this._buttonLike = this._cardElement.querySelector('.card__heart');
    const nameCard = this._cardElement.querySelector('.card__title');

    nameCard.textContent = this._data.place;

    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.place; //this was place


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
    this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
    this._buttonLike.addEventListener('click', () => this._handleCardLike());
    this._imageCard.addEventListener('click', () => this._handleImageClick(this._data));
  }

  _handleCardLike() {
    this._buttonLike.classList.toggle('card__heart_active');
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    this._buttonDelete = null;
    this._buttonLike = null;
    this._imageCard = null;
  }
}

