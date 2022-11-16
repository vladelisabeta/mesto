import { FormValidator } from "./FormValidator.js";
import { popupImage, openPopup, escClosePopup, closePopup } from './generalData.js';
import { Card } from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// popups
const popupEdit = document.querySelector('.popup_edit');
const popupCards = document.querySelector('.popup_cards');
// const popupImage = document.querySelector('.popup_image');
const generalPopup = document.querySelector('.popup');

// картинка и текст попапа-картинки
const dataImagePopup = document.querySelector('.popup__image');
const textImagePopup = document.querySelector('.popup__image-text');


// кнопки page
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// кнопки попап едит
const buttonCloseEdit = popupEdit.querySelector('.popup__button-close');
const buttonSaveEdit = popupEdit.querySelector('.popup__save');

// кнопки попап адд
const buttonCloseCards = popupCards.querySelector('.popup__button-close');
const buttonSaveCards = popupCards.querySelector('.popup__save');

// кнопка закрыть попап картинки
const buttonCloseImage = popupImage.querySelector('.popup__button-close');

// контейнер
const cardBox = document.querySelector('.place-grid');

// темплейт
const templateCard = document.querySelector('.template-card').content; //TEMPLATE

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
const allPopups = Array.from(document.querySelectorAll('.popup'));


const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formAboutValidate = new FormValidator(validateObj, formAbout)
const formCardsPopupValidate = new FormValidator(validateObj, formCardPopup)

formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()


function renderCard(data, cardBox) {
  const card = new Card(data, '.template-card')
  const initialCard = card.createCard;

  cardBox.prepend(initialCard);
}


function renderInitialCards(initialCards, cardBox) {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    renderCard(cardElement, cardBox)
  })
}

renderInitialCards(initialCards, cardBox)




// ФУНКЦИЯ САБМИТА И СБОРА ВСЕГО
function addCardSubmit(evt) {
  evt.preventDefault();
  data.name = placeInput.value;
  data.link = linkInput.value;
  const cardElement = createCard(data);
  renderCard(cardElement, cardBox);
  formCardPopup.reset();
  closePopup(popupCards);
}



// превент дефолт, переписка профиля и закрытие попап

function submitFormHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

//функция закрытия попапов на клике по оверлей

allPopups.forEach((popup) => popup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closePopup(event.target);
  }
}))

// слушатели открытия кнопок /работают

buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
})

buttonAdd.addEventListener('click', function () {
  openPopup(popupCards);
  buttonCardAdd.classList.add('popup__save_disabled');
  buttonCardAdd.setAttribute('disabled', true);
})

//слушатели закрытия /работают
buttonCloseEdit.addEventListener('click', function () {
  closePopup(popupEdit)
})

buttonCloseCards.addEventListener('click', function () {
  closePopup(popupCards)
})

buttonCloseImage.addEventListener('click', function () {
  closePopup(popupImage)
})

formAbout.addEventListener('submit', submitFormHandler)

formCardPopup.addEventListener('submit', addCardSubmit)

