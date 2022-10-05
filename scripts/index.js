const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


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

// контейнер
const cardBox = document.querySelector('.place-grid');

// темплейт
const templateCard = document.querySelector('.template-card').content;


// inputs
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_info');
const placeInput = popupCards.querySelector('.popup__input_type-place');
const linkInput = popupCards.querySelector('.popup__input_type-link');

// другое
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__info');
const formElement = document.querySelector('.popup__form');


////////////////////////////////////////////////////////////////////
// функция которая должна рендерить стартовые карточки (не работает)

function renderInitialCards(initialCards) {
  const initialCard = templateCard.cloneNode(true);
  const nameCard = initialCard.querySelector('.card__title');

  templateCard.querySelector('.card__image').src = initialCards.link
  nameCard.textContent = initialCards.name;

  cardBox.appendChild(initialCard)
}

function render() {
  initialCards.forEach(renderInitialCards)
}

render()


function pressLike(buttonLike) {
  buttonLike.classList.toggle('card__heart_active')
}





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


// общая проверка
addEventListener('click', function () {
  console.log();
})
