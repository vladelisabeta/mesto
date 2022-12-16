import { FormValidator } from "../components/FormValidator.js";
import { Card } from '../components/Card.js';
import {
  buttonEdit,
  buttonAdd,
  formAbout,
  formCardPopup,
  nameInput,
  jobInput,
} from "../utils/consts.js";
import { initialCards, validationConfig } from "../utils/objects.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

import "./index.css";
import { Popup } from "../components/Popup.js";

//code

const formAboutValidate = new FormValidator(validationConfig, formAbout)
const formCardsPopupValidate = new FormValidator(validationConfig, formCardPopup)



//POPUP CLASSES
const popupWithImage = new PopupWithImage('.popup_image')
const cardAddPopupForm = new PopupWithForm('.popup_cards', handleCardFormSubmit)

//POPUP WITH FORM ABOUT
const popupWithFormAbout = new PopupWithForm('.popup_edit', handleProfileFormSubmit)


const cardsSection = new Section({ items: initialCards, renderer: renderCard }, '.place-grid')

//создание класса
const userInfo = new UserInfo({ userNameSelector: '.profile__title', userAboutSelector: '.profile__info' })



//функции

function renderCard(data) { //renderer function для интитиал карточек
  cardsSection.addItem(createCard(data));
}


function createCard(data) { //функция для создания карточки
  const card = new Card(data, '.template-card', () => {
    popupWithImage.open(data);
  }) //
  const newCard = card.createCard();
  return newCard;
}



// рендер начальных карточек
cardsSection.renderItems()

// ИНЕЙБЛ ВАЛИДЕЙШОН
formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()


// ФУНКЦИЯ САБМИТА КАРТОЧКИ
function handleCardFormSubmit(data) {
  renderCard(data);
  cardAddPopupForm.close();
  formCardsPopupValidate.disableButtonSave();
}

// SET POPUP LISTENERS

cardAddPopupForm.setEventListeners()
popupWithImage.setEventListeners()
popupWithFormAbout.setEventListeners()

// функция сабмита профиля
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupWithFormAbout.close();
}

// СЕКЦИЯ ЛИСТЕНЕРОВ

buttonAdd.addEventListener('click', () => { cardAddPopupForm.open() })


//LISTENER OPEN ABOUT
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
  popupWithFormAbout.open();
})



// РАБОТА НАД СЫРЫМ КОДОМ

const popupConfirm = new Popup('.popup_confirm-delete')
popupConfirm.setEventListeners();
document.querySelector('.profile__avatar').addEventListener('click', () => {
  popupConfirm.open()
})
