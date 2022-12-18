
export class Card {
  constructor(data, templateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._likes = data.likes;
    this._cardId = data._id;
    this._myProfileId = data.myProfileId;
    this._ownerId = data.ownerId;

    // console.log(this._myProfileId, 'PROFILE')
    // console.log(this._ownerId, 'OWNER')
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

    this.setLikes(this._likes);
    this._checkToShowTrashIcon()

    this._setEventListeners();

    return this._cardElement;
  }

  _checkToShowTrashIcon() {
    //установка или не установка мусорки
    if (this._ownerId !== this._myProfileId) {
      this._cardElement.querySelector('.card__trash').classList.add('card__trash_hidden')
    }
  }

  checkIfLiked() {
    // лайкнуть карточку
    const myLikedCard = this._likes.find(user => user._id === this._myProfileId)

    return myLikedCard
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
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._cardId));
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._imageCard.addEventListener('click', () => this._handleImageClick(this._data));
  }

  _colorHeartBlack() {
    this._buttonLike.classList.add('card__heart_active')
  }

  _colorHeartWhite() {
    this._buttonLike.classList.remove('card__heart_active')
  }

  deleteCardFromDOM() {
    this._cardElement.remove();
    this._cardElement = null;
    this._buttonDelete = null;
    this._buttonLike = null;
    this._imageCard = null;
  }

  setLikes(newLike) {
    this._likes = newLike
    const counterLikes = this._cardElement.querySelector('.card__like-count');
    counterLikes.textContent = this._likes.length;

    if (this.checkIfLiked()) {
      this._colorHeartBlack()
    } else {
      this._colorHeartWhite()
    }
  }
}

