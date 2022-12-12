import { FormValidator } from "./FormValidator.js";
import { Card } from './Card.js';
import {
  buttonEdit,
  buttonAdd,
  formAbout,
  formCardPopup,
  nameInput,
  jobInput,
} from "./consts.js";
import { initialCards, validateObj } from './objects.js';
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

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
