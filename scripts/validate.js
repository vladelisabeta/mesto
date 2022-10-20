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

//функция установки событий на все инпуты в форме. накладывает обработчик события ввода
function setInputEventListeners(formObject) {
  const allInputs = Array.from(formObject.querySelectorAll('.popup__input'));
  console.log(allInputs); //выводит два инпута
  allInputs.forEach(addEventListener('input', ));// здесь должен быть колбек проверки валидности и проверка невалидности ХОТЯ БЫ ОДНОГО ПОЛЯ(блокировать кнопку)
}




// событие ввода текста

function createEventListener(inputObject) {
  inputObject.addEventListener('input', () => {
    checkCurrentInputValidity();
    checkAllInputValidity();
    // checkCurrentInputValidity КОНКРЕТНОГО ЭТОГО ИНПУТА(invalid = > error*function*; valid => hide error*function*
    // checkAllInputValidity (if invalid => disable save button) НУЖНА ФУНКЦИЯ ПРОВЕРКИ ВСЕЙ ФОРМЫ
  })
}

function showInputError(formObject, inputObject, errorMessage) {
  //здесь может быть ваша реклама
  const spanErrorMessage = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.add('popup__input_type_error');
  spanErrorMessage.textContent = errorMessage; // тут будет validation message
  spanErrorMessage.classList.add('popup__error_visible'); //добавляет на спан класс который показывает его
}


function hideInputError(formObject, inputObject) {
  //здесь тоже может быть ваша реклама
  const spanErrorMessage = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.remove('popup__input_type_error');
  spanErrorMessage.classList.remove('popup__error_visible'); //удаляет на спан класс который показывает его
  spanErrorMessage.textContent = '';
}

function checkCurrentInputValidity(formObject, inputObject) {
  // функция проверки конкретного инпута
  //(invalid = > error*function*;
  //valid => hide error*function*
  if (!inputObject.validity.valid) {
    showInputError(formObject, inputObject, inputObject.validationMessage); //показать ошибку 3й аргумент дефолтный текст ошибки.
  } else {
    hideInputError(formObject, inputObject);
  }
};

//функция проверки всех инпутов. берет на вход лист инпутов. коллбек возвращает инпут с ошибкой(??)
// function checkAllInputValidity(allInputs) {
//   return allInputs.some((inputObject) => {
//     return !inputObject.validity.valid
//   });
// }

function disableButtonSave(buttonSave) {
  buttonSave.setAttribute('disabled', true);
  buttonSave.classList.add('popup__save_disabled');
}

function checkAllInputValidity(allInputs, buttonSave) {
  if (allInputs.some(!inputObject.validity.valid)){
    disableButtonSave(buttonSave);
  }
}
