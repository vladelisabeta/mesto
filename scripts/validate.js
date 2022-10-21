const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(validateObj) {
  const { formSelector } = validateObj;
  const allForms = Array.from(document.querySelectorAll(formSelector));
  allForms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputEventListeners(formElement, validateObj);
  })
}

// => ===  вызывает функцию; () === содержит функцию (по факту то же самое._.)
//enableValidation => setInputEventListeners => createElementListeners => checkCurrentInputValidity(showInputError + hideInputError) + checkAllInputValidity(disableButtonSave)


// //функция установки событий на все инпуты в форме. накладывает обработчик события ввода
function setInputEventListeners(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj
  const formInput = formElement.querySelector(inputSelector);
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector));

  allInputs.forEach((formInput) => { createEventListener(formElement, validateObj) });//обработчик события ввода повешен на все инпуты ((((((())))))) здесь должен быть колбек проверки валидности и проверка невалидности ХОТЯ БЫ ОДНОГО ПОЛЯ(блокировать кнопку)
}


// // событие ввода текста
function createEventListener(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const formInput = formElement.querySelector(inputSelector);
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector)); //зачем мне тут все ипуты?
  formInput.addEventListener('input', function () {
    checkCurrentInputValidity(formElement, validateObj);
    checkAllInputValidity(formElement, validateObj); // тут нет аргументов потому что я не знаю, что именно мне передавать в данном контексте
  })
}


function showInputError(formElement, validateObj, errorMessage) {
  const {
    inputSelector,
    inputErrorClass,
    errorClass
  } = validateObj;
  
  const formInput = formElement.querySelector(inputSelector); //input
  const span = (`.${formInput.name}-error`); // = .name-error
  const spanErrorOjbect = formElement.querySelector('span');

  formInput.classList.add(inputErrorClass);
  spanErrorOjbect.textContent = errorMessage; // тут будет validation message
  spanErrorOjbect.classList.add(errorClass); //добавляет на спан класс который показывает его
  console.log(spanErrorOjbect)
}

showInputError(formElement, validateObj, 'aaaaaaaaaa')

function hideInputError(formElement, validateObj) {
  const {
    inputSelector,
    inputErrorClass,
    errorClass
  } = validateObj

  const formInput = formElement.querySelector(inputSelector);
  const span = (`.${formInput.name}-error`); // = .name-error
  const spanErrorOjbect = formElement.querySelector('span');

  formInput.classList.remove(inputErrorClass);
  spanErrorOjbect.classList.remove(errorClass); //удаляет на спан класс который показывает его
  spanErrorOjbect.textContent = '';
}

// функция проверки конкретного инпута
function checkCurrentInputValidity(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const formInput = formElement.querySelector(inputSelector);
  // if (!formInput.validity.valid) {
  //   return true
  // } else {
  //   return false
  // }

  if (!formInput.validity.valid) {
    showInputError(formElement, validateObj, formInput.validationMessage); //
    disableButtonSave(formElement, validateObj);
  } else {
    hideInputError(formElement, validateObj);
  }
};


// function hasInvalidInput(formElement, validateObj){
//   if (checkCurrentInputValidity(formElement, validateObj)) {
//     showInputError(formElement, validateObj, formInput.validationMessage); //
//     disableButtonSave(formElement, validateObj);
//     } else {
//       hideInputError(formElement, validateObj);
//       enableButtonSave(formElement, validateObj);
//     }
//   }


// я не уверена если эти двое работают
function disableButtonSave(formElement, validateObj) {
  const {
    submitButtonSelector,
    inactiveButtonClass
  } = validateObj;
  const formSaveButton = formElement.querySelector(submitButtonSelector);

  formSaveButton.setAttribute('disabled', true);
  formSaveButton.classList.add(inactiveButtonClass);
}

function enableButtonSave(formElement, validateObj) {
  const {
    submitButtonSelector,
    inactiveButtonClass
  } = validateObj;
  const formSaveButton = formElement.querySelector(submitButtonSelector);

  formSaveButton.removeAttribute('disabled');
  formSaveButton.classList.remove(inactiveButtonClass);
}

function checkAllInputValidity(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const allInputs = formElement.querySelectorAll(inputSelector);
  const formInput = formElement.querySelector(inputSelector);

  if (allInputs.some(!formInput.validity.valid)) {
    disableButtonSave(formElement, validateObj);
  }
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
