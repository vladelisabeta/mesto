let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let buttonClose = popup.querySelector('.popup__button-close');
let save = popup.querySelector('.popup__save');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_info');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__info');
let formElement = document.querySelector('.popup__form');

// POPUP OPEN и забрать текст из профиля в инпут

function openEditPopup() {
  popup.classList.add('popup_opened');
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


// POPUP CLOSE

function closePopup() {
  popup.classList.remove('popup_opened');
}


// превент дефолт, переписка профиля и закрытие попап

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup();
}


// слушатели
buttonClose.addEventListener('click', {
  handleEvent: (closePopup)
})

edit.addEventListener('click', {
  handleEvent: (openEditPopup)
})

formElement.addEventListener('submit', formSubmitHandler);
