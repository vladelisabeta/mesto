import { FormValidator } from "../components/FormValidator.js";
import { Card } from '../components/Card.js';
import {
  buttonEdit,
  buttonAdd,
  formAbout,
  formCardPopup,
  nameInput,
  jobInput,
  formAvatar,
  profileAvatar,
} from "../utils/consts.js";
import { initialCards, validationConfig } from "../utils/objects.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
// import { Popup } from "../components/Popup.js";
import { Api } from "../components/Api.js";
import { PopupConfirmDelete } from "../components/PopupConfirmDelete.js";

import "./index.css";
import "../images/pensil.svg";
import "../images/autumn_tea.jpg"


//code

const formAboutValidate = new FormValidator(validationConfig, formAbout)
const formCardsPopupValidate = new FormValidator(validationConfig, formCardPopup)
const formAvatarValidate = new FormValidator(validationConfig, formAvatar)


// ИНЕЙБЛ ВАЛИДЕЙШОН
formAboutValidate.enableValidation()
formCardsPopupValidate.enableValidation()
formAvatarValidate.enableValidation()


//POPUP CLASSES
const popupWithImage = new PopupWithImage('.popup_image')
const cardAddPopupForm = new PopupWithForm('.popup_cards', handleCardFormSubmit)

//POPUP WITH FORM ABOUT
const popupWithFormAbout = new PopupWithForm('.popup_edit', handleProfileFormSubmit)


const cardsSection = new Section({ items: initialCards, renderer: renderCard }, '.place-grid')

//создание класса
const userInfo = new UserInfo({ userNameSelector: '.profile__title', userAboutSelector: '.profile__info', userAvatarSelector: '.profile__avatar' })



//функции

function renderCard(data) { //renderer function для интитиал карточек
  cardsSection.addItem(createCard({
    place: data.name,
    link: data.link,
    likes: data.likes,
    _id: data._id,
    myProfileId: myProfileId,
    ownerId: data.owner._id
  }));
}



function createCard(data) { //функция для создания карточки ORIGINAL
  const card = new Card(data, '.template-card'
    , () => {
      popupWithImage.open(data);
    },
    (id) => {
      popupConfirm.open();
      popupConfirm.createDelete(() => { // ВОТ ТУТ ЧТО ТО УЖАСНОЕ ПРОИСХОДИТ. точно ренейм
        api.deleteCard(id)
          .then(res => {
            card.deleteCardFromDOM()
            popupConfirm.close()
          })
          .catch((error) => console.log(error, 'CUSTON ERROR'))
      })
    },
    (id) => {
      if (card.checkIfLiked()) {
        api.removeLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((error) => console.log(error, 'CUSTON ERROR'))
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((error) => console.log(error, 'CUSTON ERROR'))
      }

    })
  const newCard = card.createCard();
  return newCard;
}

// ФУНКЦИЯ САБМИТА КАРТОЧКИ
function handleCardFormSubmit(data) {
  cardAddPopupForm.renderLoading(true, 'Создание...')
  api.addCardToServer(data)
    .then(data => {
      renderCard(data);
      cardAddPopupForm.close(); // карточка закрытие
      formCardsPopupValidate.disableButtonSave();
    })
    .catch((error) => console.log(error, 'CUSTON ERROR'))
    .finally(() => cardAddPopupForm.renderLoading(false, 'Создать'))

}


// функция сабмита профиля
function handleProfileFormSubmit(data) {
  popupWithFormAbout.renderLoading(true, 'Сохранение...')
  api.editProfile(data)
    .then(res => {
      userInfo.setUserInfo(data);
      popupWithFormAbout.close();
    })
    .catch((error) => console.log(error, 'CUSTON ERROR'))
    .finally(() => popupWithFormAbout.renderLoading(false, 'Сохранить'))
}

function handleProfileAvatarSubmit(data) {
  popupAvatarUpdate.renderLoading(true, 'Сохранение...')
  api.updateAvatar(data)
    .then(res => {
      userInfo.updateUserAvatar(data)
      popupAvatarUpdate.close()
      formAvatarValidate.disableButtonSave();
    })
    .catch((error) => console.log(error, 'CUSTON ERROR'))
    .finally(() => popupAvatarUpdate.renderLoading(false, 'Сохранить'))
}


// SET POPUP LISTENERS

cardAddPopupForm.setEventListeners()
popupWithImage.setEventListeners()
popupWithFormAbout.setEventListeners()



// СЕКЦИЯ ЛИСТЕНЕРОВ

buttonAdd.addEventListener('click', () => { cardAddPopupForm.open() })


//LISTENER OPEN ABOUT
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
  popupWithFormAbout.open();
})


// РАБОТА НАД  КОДОМ


const popupAvatarUpdate = new PopupWithForm('.popup_upload-avatar', handleProfileAvatarSubmit)
popupAvatarUpdate.setEventListeners();


profileAvatar.addEventListener('click', () => {
  popupAvatarUpdate.open()
})


const popupConfirm = new PopupConfirmDelete('.popup_confirm-delete', () => {
  console.log('привет я устала поговорите мной')
})
popupConfirm.setEventListeners();


// рАБОТА НАД АПИ

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '164f802e-3ded-431e-9f1e-8df3253cf571',
    'Content-Type': 'application/json'
  }
});

//это выставляет имя пройфала с сервера( ???)
let myProfileId

Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([res, cardData]) => {
    userInfo.setUserInfo({ name: res.name, info: res.about, avatar: res.avatar })
    userInfo.updateUserAvatar({ avatar: res.avatar })
    myProfileId = res._id

    const cardsSection = new Section({ items: cardData, renderer: renderCard }, '.place-grid')
    cardsSection.renderItems()
  })
  .catch((error) => console.log(error, 'CUSTON ERROR'))

