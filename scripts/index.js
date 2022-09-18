let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let buttonClose = popup.querySelector('.popup__button-close');
let save = popup.querySelector('.popup__save');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_info');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__info');
let formElement = document.querySelector('.popup__form');

// POPUP OPEN

function openPopup() {
  popup.classList.add('popup_opened');
}

edit.addEventListener('click', {
  handleEvent: (openPopup)
})

// POPUP CLOSE

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', {
  handleEvent: (closePopup)
})

// INPUT
// ПИШЕМ ФУНКЦИЮ, КОТОРАЯ ДОЛЖНА СРАБОТАТЬ КОГДА ПРОИЗОЙДЕТ ДЕЙСТВИЕ

//ЭТО ДАЕТ МНЕ ЗАБРАТЬ ТЕКСТ ИЗ ПРОФИЛЯ В ВВОД
function editProfile() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

edit.addEventListener('click', {
  handleEvent: (editProfile)
})

// функция для переписывания профиля
function enterInfo() {
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
}

// функция превент дефалт

function formSubmitHandler(evt) {
  evt.preventDefault();
}

// это для сохранения формы при отправке
formElement.addEventListener('submit', {
  handleEvent: (enterInfo)
})


// это закрывает форму при сохранении
formElement.addEventListener('submit', {
  handleEvent: (closePopup)
})

formElement.addEventListener('submit', formSubmitHandler);
