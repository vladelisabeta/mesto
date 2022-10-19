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

function showInputError(formSelector, inputSelector, errorMessage) {
  const spanErrorMessage = formSelector.querySelector(`.${inputSelector.id}-error`); //errorElement
  inputSelector.classList.add('popup__input_type_error'); //ошибка ИНПУТА
  spanErrorMessage.textContent = errorMessage;
  spanErrorMessage.classList.add('popup__error_visible'); // текст ошибки
};
// функция сокрытия ошибки

function hideInputError(formSelector, inputSelector) {
  const spanErrorMessage = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  spanErrorMessage.classList.remove('popup__error_visible');
  spanErrorMessage.textContent = '';
};

// проверка валидности
function checkInputValidation(formSelector, inputSelector) {
  if (!inputSelector.vaidity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

// функция создания обработчиков

function setListenersForInputs(formSelector) {
  const allInputs = Array.from(formSelector.querySelectorAll('.popup__input'));
  allInputs.forEach(createEventListener(inputSelector));
}

// функция создания ивент листенера
function createEventListener(inputSelector) {
  inputSelector.addEventListener('input', function () {
    checkInputValidation(formSelector, inputSelector);
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


// попытка вызвать функцию ._. не работает конечно же
enableValidation(({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}))
