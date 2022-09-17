let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let buttonClose = popup.querySelector('.popup__button-close');
let save = popup.querySelector('.popup__save');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__info');
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

function formSubmitHandler(evt) {
  evt.preventDefault();

  console.log(jobInput.value); // это работает
  console.log(nameInput.value); // это тоже работает
  // jobInput.value.textContent = jobInput.value; // я не знаю, что это. пусть пока будет так.
}


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

save.addEventListener('click', {
  handleEvent: (enterInfo)
})


formElement.addEventListener('submit', formSubmitHandler);
