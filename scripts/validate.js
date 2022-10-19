// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// ПРОПИСАТЬ СТИЛИ СПАНА ОШИБКИ
// временный блок
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' // сделан. существует как класс. надо стилизовать и прописать везде.
});

