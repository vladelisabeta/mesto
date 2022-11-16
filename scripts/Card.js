import {popupImage, openPopup, escClosePopup, closePopup} from './generalData.js'

export class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateCard = document.querySelector(templateSelector).content;
  }

   createCard({ name, link }) {
    const initialCard = this._templateCard.cloneNode(true);
    const nameCard = initialCard.querySelector('.card__title');
    const imageCard = initialCard.querySelector('.card__image');

    imageCard.src = link;
    nameCard.textContent = name;

    imageCard.alt = name;


    this._setEventListeners(initialCard);
    return initialCard;
  }

  _setEventListeners(newCard) {
    const buttonDelete = newCard.querySelector('.card__trash');
    buttonDelete.addEventListener('click', this._deleteCard);

    const buttonLike = newCard.querySelector('.card__heart');
    buttonLike.addEventListener('click', this._pressLike);

    const cardImage = newCard.querySelector('.card__image');
    cardImage.addEventListener('click', this._openImagePopup);
  }

  // лайк функция
  _pressLike(buttonLike) {
    buttonLike.target.classList.toggle('card__heart_active')
  }

  // делит функция
  _deleteCard(button) {
    const buttonDelete = button.target.closest('.card');
    buttonDelete.remove()
  }

   _openImagePopup(card) {
    const cardImage = card.target;
    const imageData = cardImage.src;
    const textData = cardImage.alt;

    textImagePopup.textContent = textData;
    dataImagePopup.src = imageData;
    dataImagePopup.alt = textData;
    openPopup(popupImage); //не относится к карточке
  }


}
