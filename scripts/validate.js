const validateObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(validateObj){
  const {formSelector} = validateObj;
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


//функция установки событий на все инпуты в форме. накладывает обработчик события ввода
function setInputEventListeners(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector));
  allInputs.forEach(createEventListener(inputSelector));//обработчик события ввода повешен на все инпуты ((((((())))))) здесь должен быть колбек проверки валидности и проверка невалидности ХОТЯ БЫ ОДНОГО ПОЛЯ(блокировать кнопку)
}

setInputEventListeners(validateObj)
// событие ввода текста
function createEventListener(formElement, validateObj) {
  const {
    inputSelector,
    submitButtonSelector,
  } = validateObj
  const allInputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputSelector.addEventListener('input', () => {
    checkCurrentInputValidity(formElement, inputSelector);
    checkAllInputValidity(formElement, submitButtonSelector); // тут нет аргументов потому что я не знаю, что именно мне передавать в данном контексте
  })
}

function showInputError(formElement, validateObj, errorMessage) {
  const {
    inputSelector,
    inputErrorClass,
    errorClass
  } = validateObj;
  const spanErrorMessage = formElement.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  spanErrorMessage.textContent = errorMessage; // тут будет validation message
  spanErrorMessage.classList.add(errorClass); //добавляет на спан класс который показывает его
}


function hideInputError(formElement, validateObj) {
  const {
    inputSelector,
    inputErrorClass,
    errorClass
  } = validateObj
  const spanErrorMessage = formElement.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  spanErrorMessage.classList.remove(errorClass); //удаляет на спан класс который показывает его
  spanErrorMessage.textContent = '';
}

// функция проверки конкретного инпута
function checkCurrentInputValidity(formElement, validateObj) {
  const {
    inputSelector,
  } = validateObj;

  if (!inputSelector.validity.valid) {
    showInputError(formElement, inputSelector, inputSelector.validationMessage); //показать ошибку 3й аргумент дефолтный текст ошибки.
  } else {
    hideInputError(formElement, inputSelector);
  }
};

// я не уверена если эти двое работают
function disableButtonSave(validateObj) {
  const {
    submitButtonSelector,
    inactiveButtonClass
  } = validateObj
  submitButtonSelector.setAttribute('disabled', true);
  submitButtonSelector.classList.add(inactiveButtonClass);
}

function checkAllInputValidity(formElement, validateObj) {
  const{
    inputSelector,
    submitButtonSelector,
  } = validateObj;
  const allInputs = formElement.querySelectorAll(inputSelector);
  if (allInputs.some(!inputSelector.validity.valid)){
    disableButtonSave(submitButtonSelector);
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
