// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled', //save disabled сделать
  inputErrorClass: 'popup__input_type_error', // сделать
  errorClass: 'popup__error_visible' // сделать
});
