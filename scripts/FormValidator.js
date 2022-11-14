export class FormValidator {
  constructor(validateObj, formElement) {
    this._formElement = formElement;
    this._validateObj = validateObj;
  }

  enableValidation() {
    this._formElement.this._setInputEventListeners();
  }

  _setInputEventListeners() {
    const formSaveButton = this._formElement.querySelector(this._validateObj.submitButtonSelector);
    const allInputs = Array.from(this._formElement.querySelectorAll(this._validateObj.inputSelector));

    allInputs.forEach((formInput) => {
      this._createEventListener(formInput, allInputs, formSaveButton)
    });
    this._checkAllInputValidity(allInputs, formSaveButton);
  }

  _createEventListener(formInput, allInputs, formSaveButton) {
    formInput.addEventListener('input', () => {
      this._hasInvalidInput(formInput);
      this._checkAllInputValidity(validateObj, allInputs, formSaveButton);
    })
  }


 _checkAllInputValidity(allInputs, formSaveButton) {
  if (this._reactIfHasInvalidInput(allInputs)) {
    this._disableButtonSave(formSaveButton);
  } else {
    this._enableButtonSave(formSaveButton);
  }
}

_reactIfHasInvalidInput(allInputs) {
  return allInputs.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

 _disableButtonSave(formSaveButton) {
  formSaveButton.setAttribute('disabled', true);
  formSaveButton.classList.add(this._validateObj.inactiveButtonClass);
}

_enableButtonSave(formSaveButton) {
  formSaveButton.removeAttribute('disabled');
  formSaveButton.classList.remove(this._validateObj.inactiveButtonClass);
}


 _hasInvalidInput(formInput) {
  if (!formInput.validity.valid) {
    this._showInputError(formInput, formInput.validationMessage);
  } else {
    this._hideInputError(formInput);
  }
}

_showInputError(formInput, errorMessage) {

  const span = `#${formInput.id}-error`; // #name-error

  const spanErrorElement = this._formElement.querySelector(span);

  formInput.classList.add(this._validateObj.inputErrorClass);
  spanErrorElement.textContent = errorMessage;
  spanErrorElement.classList.add(this._validateObj.errorClass);
}

_hideInputError(formInput) {
  const span = `#${formInput.id}-error`;
  const spanErrorElement = this._formElement.querySelector(span);

  formInput.classList.remove(this._validateObj.inputErrorClass);
  spanErrorElement.classList.remove(this._validateObj.errorClass);
  spanErrorElement.textContent = '';
}


}

