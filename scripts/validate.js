// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// ПРОПИСАТЬ СТИЛИ СПАНА ОШИБКИ

// временный блок
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible' // сделан. существует как класс. надо стилизовать и прописать везде.
// });

// ФУНКЦИИ

// функция показа ошибки

function showInputError(formElement, inputElement, errorMessage) {
  const spanErrorMessage = formElement.querySelector(`.${inputElement.id}-error`); //errorElement
  inputElement.classList.add('popup__input_type_error'); //ошибка ИНПУТА
  spanErrorMessage.textContent = errorMessage;
  spanErrorMessage.classList.add('popup__error_visible'); // текст ошибки
};
// функция сокрытия ошибки

function hideInputError(formElement, inputElement) {
  const spanErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  spanErrorMessage.classList.remove('popup__error_visible');
  spanErrorMessage.textContent = '';
};

// проверка валидности
function checkInputValidation(formElement, inputElement) {
  if (!inputElement.vaidity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// функция создания обработчиков

function setListenersForInputs(formElement) {
  const allInputs = Array.from(formElement.querySelectorAll('.popup__input'));
  allInputs.forEach(createEventListener(inputElement));
}

// функция создания ивент листенера
function createEventListener(inputElement) {
  inputElement.addEventListener('input', function () {
    checkInputValidation(formElement, inputElement);
  });
}

function enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}) {
  const allForms = Array.from(document.querySelectorAll(formSelector));
  allForms.forEach(function (formSelector) {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setListenersForInputs(formSelector);
  });
}

enableValidation(({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' // сделан. существует как класс. надо стилизовать и прописать везде.
}))
