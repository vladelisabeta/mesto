// popups
const popupEdit = document.querySelector('.popup_edit');
const popupCards = document.querySelector('.popup_cards');

// кнопки page
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// кнопки попап едит
const buttonCloseEdit = popupEdit.querySelector('.popup__button-close');
const buttonSaveEdit = popupEdit.querySelector('.popup__save');

// кнопки попап адд
const buttonCloseCards = popupCards.querySelector('.popup__button-close');
const buttonSaveCards = popupCards.querySelector('.popup__save');


// inputs
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_info');
const placeInput = popupCards.querySelector('.popup__input_type-place');
const linkInput = popupCards.querySelector('.popup__input_type-link');

// другое
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__info');
const formElement = document.querySelector('.popup__form');



// фуНКЦИИ
// POPUP OPEN и забрать текст из профиля в инпут

// function takeInfo() {
//   jobInput.value = profileJob.textContent;
//   nameInput.value = profileName.textContent;
// }

// открыть попап

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// закрыть попап

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// превент дефолт, переписка профиля и закрытие попап

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup();
}


// слушатели открытия кнопок /работают
// ВОТ ОТСЮДА ФУНКЦИЯ ДЛЯ ПЕРЕПИСКИ ШТУК СДЕЛАТЬ ГИБКИЙ ФОРМАТ ИНПУТОВ

buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
})

buttonAdd.addEventListener('click', function () {
  openPopup(popupCards)
})

//слушатели закрытия /работают
buttonCloseEdit.addEventListener('click', function () {
  closePopup(popupEdit)
})

buttonCloseCards.addEventListener('click', function () {
  closePopup(popupCards)
})

// кнопка сейва работает но вылезает странная ошибка
buttonSaveEdit.addEventListener('click', function () {
  console.log('hello');
})

formElement.addEventListener('submit', formSubmitHandler)
