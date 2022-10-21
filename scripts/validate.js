const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// надо сделать чтобы все формы проверялись

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
console.log(formInput)
}
setInputEventListeners(formElement, validateObj)

// // событие ввода текста
function createEventListener(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const formInput = formElement.querySelector(inputSelector);
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector)); //зачем мне тут все ипуты?
  formInput.addEventListener('input', function () {
    checkCurrentInputValidity(formElement, validateObj);
    hasInvalidInput(formElement, validateObj); // тут нет аргументов потому что я не знаю, что именно мне передавать в данном контексте
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
}



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
  const formInputNotValid = !formInput.validity.valid

  if (formInputNotValid) {
    return true
  } else {
    return false
  }
};


function hasInvalidInput(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const formInput = formElement.querySelector(inputSelector);
  if (checkCurrentInputValidity(formElement, validateObj)) {
    showInputError(formElement, validateObj, formInput.validationMessage);
  } else {
    hideInputError(formElement, validateObj);
  }
}

function checkAllInputValidity(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;
  const formInput = formElement.querySelector(inputSelector);
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector));
  const formInputNotValid = !formInput.validity.valid;
  allInputs.some((formInputNotValid) => {
    disableButtonSave(formElement, validateObj); //вот где то тут у меня хромает логика
  })
}


// проверить валидность конкретного ипута. возвращать булево значение = checkCurrentInputValidity
// если есть невалидное поле, тогда выводятся ошибки. если все хорошо - скрываются = hasInvalidInput
// если есть хоть одно неправильное поле(функция проверки всех полей) - блокируется кнопка = checkAllInputValidity


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


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
