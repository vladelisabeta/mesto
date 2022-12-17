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
import { Popup } from "../components/Popup.js";
import { Api } from "../components/Api.js";


import "./index.css";
import "../images/pensil.svg";
import "../images/autumn_tea.jpg"


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
  }, (id) => {
    console.log('iDDDDD', id) // открывает айди. значит, можно удалять.
    popupConfirm.open()
  }) //
  const newCard = card.createCard();
  return newCard;
}



// рендер начальных карточек // ВОЗМОЖНО ОНИ И НЕ НУЖНЫ
// cardsSection.renderItems()

// ИНЕЙБЛ ВАЛИДЕЙШОН
formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()


// ФУНКЦИЯ САБМИТА КАРТОЧКИ
function handleCardFormSubmit(data) {
  api.addCardToServer(data)
    .then(res => {
      console.log('resultat', res)
      renderCard(data);
      cardAddPopupForm.close();
    })
  formCardsPopupValidate.disableButtonSave();
}


// SET POPUP LISTENERS

cardAddPopupForm.setEventListeners()
popupWithImage.setEventListeners()
popupWithFormAbout.setEventListeners()

// функция сабмита профиля
function handleProfileFormSubmit(data) {
  api.editProfile(data)
    .then(res => {
      userInfo.setUserInfo(data);
      popupWithFormAbout.close();
    })
}


// // функция сабмита профиля
// function handleProfileFormSubmit(data) {
//   userInfo.setUserInfo(data);
//   popupWithFormAbout.close();
// }


// СЕКЦИЯ ЛИСТЕНЕРОВ

buttonAdd.addEventListener('click', () => { cardAddPopupForm.open() })


//LISTENER OPEN ABOUT
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
  popupWithFormAbout.open();
})

//УДАЛЕНИЕ ПО КНОПКЕ
const buttonDeleteConfirm = document.querySelector('.popup__save_confirm')
buttonDeleteConfirm.addEventListener('click', () => {
  
})

// РАБОТА НАД СЫРЫМ КОДОМ

const popupConfirm = new Popup('.popup_confirm-delete')
popupConfirm.setEventListeners();



const popupAvatarUpdate = new PopupWithForm('.popup_upload-avatar')
popupAvatarUpdate.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () => {
  popupAvatarUpdate.open()
})


// рАБОТА НАД АПИ

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '164f802e-3ded-431e-9f1e-8df3253cf571',
    // authorization: '164f802e-3ded-431e-9f1e-8df3253cf571',
    'Content-Type': 'application/json'
  }
});


//это выставляет имя пройфала с сервера( ???)

api.getUserProfile()
  .then(res => {
    console.log('answer', res)
    userInfo.setUserInfo({ name: res.name, info: res.about })
  })

api.getInitialCards()
  .then(cardData => {
    cardData.forEach(data => {
      console.log(data) // тут объекты карточек
      renderCard({ place: data.name, link: data.link, likes: data.likes, _id: data._id})
    })
  })




