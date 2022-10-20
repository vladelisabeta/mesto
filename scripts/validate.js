const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// function enableValidation({ formSelector, }) {
//   const allForms = Array.from(document.querySelectorAll(formSelector));
//   console.log(allForms); // выводит две формы
//   allForms.forEach(setEventListeners());
// }

// function setEventListeners(formObject) {
//   const allInputs = Array.from(formObject.querySelectorAll(''))
// } //скорее всего ненужная функция

//функция установки событий на все инпуты в форме. вызывает функцию
function setInputEventListeners(formObject) {
  const allInputs = Array.from(formObject.querySelectorAll('.popup__input'));
  console.log(allInputs); //выводит два инпута
  allInputs.forEach(addEventListener('input', ));// здесь должен быть колбек проверки валидности и прочие приколы
}




// событие ввода текста

function createEventListener(inputField) {
  inputField.addEventListener('input', () => {
    // checkCurrentInputValidity КОНКРЕТНОГО ЭТОГО ИНПУТА(invalid = > error*function*; valid => hide error*function*
    // checkAllInputValidity (if invalid => disable save button) НУЖНА ФУНКЦИЯ ПРОВЕРКИ ВСЕЙ ФОРМЫ
  })
}

function showInputError() {
  //здесь может быть ваша реклама
}


function hideInputError() {
  //здесь тоже может быть ваша реклама
}

function checkCurrentInputValidity() {
// функция проверки конкретного инпута
//(invalid = > error*function*;
//valid => hide error*function*
}

function checkAllInputValidity() {
  //разобраться что делает и кнопка!!!!!!!!!
}
