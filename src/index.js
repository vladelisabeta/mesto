import { FormValidator } from "./scripts/FormValidator.js";
import { Card } from './scripts/Card.js';
import {
  buttonEdit,
  buttonAdd,
  formAbout,
  formCardPopup,
  nameInput,
  jobInput,
} from "./scripts/consts.js";
import { initialCards, validateObj } from './scripts/objects.js'; //
import { UserInfo } from "./scripts/UserInfo.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import "./pages/index.css";
import "./images/kusto.jpg";
import "./images/logo.svg";

//code

const formAboutValidate = new FormValidator(validateObj, formAbout)
const formCardsPopupValidate = new FormValidator(validateObj, formCardPopup)

formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()



function renderCard(data) {
  const card = new Card(data, '.template-card', () => {
    popupWithImage.open(data);
  }) //
  const newCard = card.createCard();

  section.addItem(newCard)
}

const section = new Section({ items: initialCards, renderer: renderCard }, '.place-grid')

// рендер начальных карточек
section.renderItems()


//тут оно пока просто есть USER INFO
const userInfo = new UserInfo({ userNameSelector: '.profile__title', userAboutSelector: '.profile__info' })

userInfo.getUserInfo()


//POPUP CLASSES
const popupWithImage = new PopupWithImage('.popup_image')
const cardAddPopupForm = new PopupWithForm('.popup_cards', addCardSubmit)

//POPUP WITH FORM ABOUT
const popupWithFormAbout = new PopupWithForm('.popup_edit', submitFormAboutHandler)


//LISTENER OPEN CARD ADD

buttonAdd.addEventListener('click', () => {
  cardAddPopupForm.open()
})

//LISTENER OPEN ABOUT
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
  popupWithFormAbout.open();
  // userInfo.setUserInfo(userInfo.getUserInfo())
})


// SET POPUP LISTENERS

cardAddPopupForm.setEventListeners()
popupWithImage.setEventListeners()
popupWithFormAbout.setEventListeners()


function submitFormAboutHandler(data) {
  userInfo.setUserInfo(data);
  popupWithFormAbout.close();
}


// ФУНКЦИЯ САБМИТА И СБОРА ВСЕГО
function addCardSubmit(data) {
  renderCard(data);
  cardAddPopupForm.close();
}
