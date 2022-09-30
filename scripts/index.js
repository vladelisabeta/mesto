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

function takeInfo() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

console.log({buttonCloseCards})

// открыть попап

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// POPUP CLOSE

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupCards() {
  popupCards.classList.remove('popup_opened');
}

// превент дефолт, переписка профиля и закрытие попап

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup();
}


// слушатели

// buttonClose.addEventListener('click', {
//   handleEvent: (closePopup)
// })

// buttonEdit.addEventListener('click', {
//   handleEvent: (openPopup)
// })


// слушатели открытия кнопок
buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
})

buttonAdd.addEventListener('click', function () {
  openPopup(popupCards)
})

buttonCloseEdit.addEventListener('click', function () {
  closePopup(popupEdit)
})

buttonCloseCards.addEventListener('click', function () {
  closePopup(popupCards)
})

formElement.addEventListener('submit', formSubmitHandler);
