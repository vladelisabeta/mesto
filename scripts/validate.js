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

function setInputEventListeners(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;

  const allInputs = Array.from(formElement.querySelectorAll(inputSelector));
  allInputs.forEach((formInput) => {
    createEventListener(validateObj, formInput, formElement, allInputs)
  }); //тут появляется инпут
  checkAllInputValidity(validateObj, allInputs, formElement);
}

// // событие ввода текста
function createEventListener(validateObj, formInput, formElement, allInputs) {
  formInput.addEventListener('input', function () {
    checkCurrentInputValidity(formInput);
    hasInvalidInput(validateObj, formInput, formElement, allInputs);
    checkAllInputValidity(validateObj, allInputs, formElement);
  })
}


//функция НАЛИЧИЯ невалидного инпута и реакция
function hasInvalidInput(validateObj, formInput, formElement, allInputs) {
  if (checkCurrentInputValidity(formInput)) {
    showInputError(validateObj, formInput, formInput.validationMessage, formElement);
    checkAllInputValidity(validateObj, allInputs, formElement);
  } else {
    hideInputError(validateObj, formInput, formElement);
    checkAllInputValidity(validateObj, allInputs, formElement);
  }
}

//сюда надо притащить formElement
function showInputError(validateObj, formInput, errorMessage, formElement) {
  const {
    inputErrorClass,
    errorClass
  } = validateObj;

  const span = `#${formInput.id}-error`; // #name-error

  const spanErrorElement = formElement.querySelector(span);

  formInput.classList.add(inputErrorClass);
  spanErrorElement.textContent = errorMessage;
  spanErrorElement.classList.add(errorClass);
}


//сюда надо притащить formElement. выбирается не тот спан в ДОМ но выводится нужный id
function hideInputError(validateObj, formInput, formElement) {
  const {
    inputErrorClass,
    errorClass
  } = validateObj

  const span = `#${formInput.id}-error`;
  const spanErrorElement = formElement.querySelector(span);

  formInput.classList.remove(inputErrorClass);
  spanErrorElement.classList.remove(errorClass); //удаляет на спан класс который показывает его
  spanErrorElement.textContent = '';
}


// функция проверки конкретного инпута
function checkCurrentInputValidity(formInput) {
  const formInputNotValid = !formInput.validity.valid

  if (formInputNotValid) {
    return true
  } else {
    return false
  }
};


// функция проверки ВСЕГО и блокировка кнопки. здесь большие проблемы с логикой
function checkAllInputValidity(validateObj, allInputs, formElement) {
  if (ifHasInvalidInput(allInputs)) {
    disableButtonSave(validateObj, formElement);
  } else {
    enableButtonSave(validateObj, formElement);
  }
}


// я не уверена если эти двое работают
function disableButtonSave(validateObj, formElement) {
  const {
    submitButtonSelector,
    inactiveButtonClass
  } = validateObj;
  const formSaveButton = formElement.querySelector(submitButtonSelector);

  formSaveButton.setAttribute('disabled', true);
  formSaveButton.classList.add(inactiveButtonClass);
}

function ifHasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}


function enableButtonSave(validateObj, formElement) {
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
})

const setSpanErrorAll = () => {
  const spans = document.querySelectorAll('.popup__error');
  const allSpans = Array.from(spans);
  allSpans.forEach((kiss) => { kiss.classList.add('popup__error_visible') })
}


// setSpanErrorAll()
const unsetSpanErrorAll = () => {
  const spans = document.querySelectorAll('.popup__error');
  const allSpans = Array.from(spans);
  allSpans.forEach((kiss) => { kiss.classList.remove('popup__error_visible') })
}

setSpanErrorAll()

