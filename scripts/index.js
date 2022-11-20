import { FormValidator } from "./FormValidator.js";
import { popupImage, openPopup, closePopup } from './generalData.js';
import { Card } from './Card.js';
import {initialCards, validateObj} from './objects.js';


// popups
const popupEdit = document.querySelector('.popup_edit');
const popupCards = document.querySelector('.popup_cards');


// картинка и текст попапа-картинки
const dataImagePopup = document.querySelector('.popup__image');
const textImagePopup = document.querySelector('.popup__image-text');


// кнопки page
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// контейнер
const cardBox = document.querySelector('.place-grid');

//кнопка сохранить карточку
const buttonCardAdd = popupCards.querySelector('.popup__save');

// inputs
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_info');
const placeInput = popupCards.querySelector('.popup__input_type-place');
const linkInput = popupCards.querySelector('.popup__input_type-link');

// другое
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__info');
const formAbout = document.querySelector('.popup__form');// formAbout
const cardElement = document.querySelector('.popup_cards');
const formCardPopup = document.querySelector('.popup__form_cards');
const allPopups = document.querySelectorAll('.popup');

//code

const formAboutValidate = new FormValidator(validateObj, formAbout)
const formCardsPopupValidate = new FormValidator(validateObj, formCardPopup)

formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()


function renderCard(data, cardBox) {
  const card = new Card(data, '.template-card', openImagePopup)
  const newCard = card.createCard();

  cardBox.prepend(newCard);
}

function renderInitialCards(initialCards, cardBox) {
  initialCards.forEach((item) => {
    renderCard(item, cardBox)
  })
}

renderInitialCards(initialCards, cardBox)


// ФУНКЦИЯ САБМИТА И СБОРА ВСЕГО
function addCardSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: placeInput.value,
    link: linkInput.value
  }
  renderCard(data, cardBox);
  formCardPopup.reset();
  closePopup(popupCards);
}

// превент дефолт, переписка профиля и закрытие попап

function submitFormAboutHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

//функция закрытия попапов на клике по оверлей

allPopups.forEach((popup) => popup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__button-close')) {
    closePopup(event.target.closest('.popup'));
  }
}))


function openImagePopup(data) {
  const textImagePopup = popupImage.querySelector('.popup__image-text');
  const dataImagePopup = popupImage.querySelector('.popup__image');

  textImagePopup.textContent = data.name;
  dataImagePopup.src = data.link;
  dataImagePopup.alt = data.name;
  openPopup(popupImage);
}


// слушатели открытия кнопок /работают

buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
})

buttonAdd.addEventListener('click', () => {
  openPopup(popupCards);
  formCardsPopupValidate.disableButtonSave();
})

formAbout.addEventListener('submit', submitFormAboutHandler)

formCardPopup.addEventListener('submit', addCardSubmit)
