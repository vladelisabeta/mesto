const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(validateObj) {
  const allForms = Array.from(document.querySelectorAll(validateObj.formSelector));
  allForms.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputEventListeners(validateObj);
  })
}
// => ===  вызывает функцию; () === содержит функцию (по факту то же самое._.)
//enableValidation => setInputEventListeners => createElementListeners => checkCurrentInputValidity(showInputError + hideInputError) + checkAllInputValidity(disableButtonSave)


//функция установки событий на все инпуты в форме. накладывает обработчик события ввода
function setInputEventListeners(validateObj) {
  const allInputs = Array.from(document.querySelectorAll(validateObj.inputSelector));
  console.log(allInputs); //выводит два инпута
  allInputs.forEach(createEventListener(validateObj.inputSelector));//обработчик события ввода повешен на все инпуты ((((((())))))) здесь должен быть колбек проверки валидности и проверка невалидности ХОТЯ БЫ ОДНОГО ПОЛЯ(блокировать кнопку)
}

setInputEventListeners(validateObj)
// событие ввода текста
function createEventListener(validateObj.inputSelector) {
  validateObj.inputSelector.addEventListener('input', () => {
    checkCurrentInputValidity({validateObj.formSelector, validateObj.inputSelector});
    checkAllInputValidity(); // тут нет аргументов потому что я не знаю, что именно мне передавать в данном контексте
  })
}

function showInputError(formObject, inputObject, errorMessage) {
  const spanErrorMessage = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.add('popup__input_type_error');
  spanErrorMessage.textContent = errorMessage; // тут будет validation message
  spanErrorMessage.classList.add('popup__error_visible'); //добавляет на спан класс который показывает его
}


function hideInputError(formObject, inputObject) {
  const spanErrorMessage = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.remove('popup__input_type_error');
  spanErrorMessage.classList.remove('popup__error_visible'); //удаляет на спан класс который показывает его
  spanErrorMessage.textContent = '';
}

// функция проверки конкретного инпута
function checkCurrentInputValidity(formObject, inputObject) {
  if (!inputObject.validity.valid) {
    showInputError(formObject, inputObject, inputObject.validationMessage); //показать ошибку 3й аргумент дефолтный текст ошибки.
  } else {
    hideInputError(formObject, inputObject);
  }
};

// я не уверена если эти двое работают
function disableButtonSave(buttonSave) {
  buttonSave.setAttribute('disabled', true);
  buttonSave.classList.add('popup__save_disabled');
}

function checkAllInputValidity(allInputs, buttonSave) {
  if (allInputs.some(!inputObject.validity.valid)){
    disableButtonSave(buttonSave);
  }
}

// enableValidation(validateObj);
