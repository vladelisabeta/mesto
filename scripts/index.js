let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let buttonClose = popup.querySelector('.popup__button-close');
let save = popup.querySelector('.popup__save');

function openClosePopup() {
  popup.classList.toggle('popup_opened');
}

edit.addEventListener('click', {
  handleEvent: (openClosePopup)
})

buttonClose.addEventListener('click', {
  handleEvent: (openClosePopup)
})

let formElement = document.querySelector('.popup__form');

// let nameInput = popup.querySelector('.popup__name');
// let jobInput = popup.querySelector('.popup__info');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = popup.querySelector('.popup__name');
  let jobInput = popup.querySelector('.popup__info');

  // console.log(jobInput.value);
  jobInput.value.textContent = jobInput.value;
}

// save.addEventListener('click', {
//   handleEvent: (formSubmitHandler)
// })

formElement.addEventListener('submit', formSubmitHandler);
