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
const popupImage = document.querySelector('.popup_image');

// картинка и текст попапа-картинки
const dataImagePopup = document.querySelector('.popup__image');
const textImagePopup = document.querySelector('.popup__image-text');


// кнопки page
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// кнопки попап едит
const buttonCloseEdit = popupEdit.querySelector('.popup__button-close');
const buttonSaveEdit = popupEdit.querySelector('.popup__save');

// кнопки попап адд
const buttonCloseCards = popupCards.querySelector('.popup__button-close');
const buttonSaveCards = popupCards.querySelector('.popup__save');

// кнопка закрыть попап картинки
const buttonCloseImage = popupImage.querySelector('.popup__button-close');

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
const cardElement = document.querySelector('.popup_cards');
const formCardPopup = document.querySelector('.popup__form_cards');
const escButtonCode = 27;


////////////////////////////////////////////////////////////////////
// функция которая должна рендерить карточки

function createCard({ name, link }) {
  const initialCard = templateCard.cloneNode(true);
  const nameCard = initialCard.querySelector('.card__title');
  const imageCard = initialCard.querySelector('.card__image');

  imageCard.src = link;
  nameCard.textContent = name;

  imageCard.alt = name;


  setEventListeners(initialCard);
  return initialCard;
}

function renderCard(createCard, cardBox) {
  cardBox.prepend(createCard);
}


function renderInitialCards(initialCards, cardBox) {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    renderCard(cardElement, cardBox)
  })
}

renderInitialCards(initialCards, cardBox)

// функция для навешивания слушателей

function setEventListeners(newCard) {
  const buttonDelete = newCard.querySelector('.card__trash');
  buttonDelete.addEventListener('click', deleteCard);

  const buttonLike = newCard.querySelector('.card__heart');
  buttonLike.addEventListener('click', pressLike);

  const cardImage = newCard.querySelector('.card__image');
  cardImage.addEventListener('click', openImagePopup);
}

// лайк функция
function pressLike(buttonLike) {
  buttonLike.target.classList.toggle('card__heart_active')
}

// делит функция
function deleteCard(button) {
  const buttonDelete = button.target.closest('.card');
  buttonDelete.remove()
}


//
function escClosePopup(event) {
  if (event.which === escButtonCode) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}



// функция добавления новых карточек
function addNewCard({ name, link }) {
  name = placeInput.value;
  link = linkInput.value;
  const cardElement = createCard({ name, link });
  renderCard(cardElement, cardBox);
}

// ФУНКЦИЯ САБМИТА И СБОРА ВСЕГО
function addCardSubmit(evt) {
  evt.preventDefault();
  addNewCard({ name, link });
  resetCardsInput();
  closePopup(popupCards);
}


// функция для открытия попапа с картинкой

function openImagePopup(card) {
  const cardImage = card.target;
  const imageData = cardImage.src;
  const textData = cardImage.alt;

  textImagePopup.textContent = textData;
  dataImagePopup.src = imageData;
  dataImagePopup.alt = textData;
  openPopup(popupImage);
}

// функция ресета
function resetCardsInput() {
  formCardPopup.reset();
}

// открыть попап

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClosePopup);
}

// закрыть попап

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopup)
}


// превент дефолт, переписка профиля и закрытие попап

function submitFormHandler(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}


// закрытие попапа по клику на оверлей
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closePopup(event.target);
  }
});



// слушатели открытия кнопок /работают


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

buttonCloseImage.addEventListener('click', function () {
  closePopup(popupImage)
})

formElement.addEventListener('submit', submitFormHandler)

cardElement.addEventListener('submit', addCardSubmit)

