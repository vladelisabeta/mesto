export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;

    this._formSaveButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._allInputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));

  }

  enableValidation() {
    this._setInputEventListeners();
  }

  _setInputEventListeners() {
    this._formElement.addEventListener('submit', (event) => event.preventDefault())
    this._allInputs.forEach((formInput) => {
      this._setInputEventListener(formInput)
    });
    this._checkAllInputValidity();
  }

  _setInputEventListener(formInput) { // _createEventListener // _setEventForInput
    formInput.addEventListener('input', () => {
      this._toggleInputErrorState(formInput);
      this._checkAllInputValidity();
    })
  }


  _checkAllInputValidity() {
    if (this._hasInvalidInput()) {
      this.disableButtonSave();
    } else {
      this._enableButtonSave();
    }
  }

  _hasInvalidInput() { //_reactIfHasInvalidInput // _checkIfHasInvalidInput
    return this._allInputs.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  disableButtonSave() {
    this._formSaveButton.setAttribute('disabled', true);
    this._formSaveButton.classList.add(this._validationConfig.inactiveButtonClass);
  }

  _enableButtonSave() {
    this._formSaveButton.removeAttribute('disabled');
    this._formSaveButton.classList.remove(this._validationConfig.inactiveButtonClass);
  }


  _toggleInputErrorState(formInput) { // _hasInvalidInput // _reactInvalidInput
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _showInputError(formInput, errorMessage) {

    const span = `#${formInput.id}-error`; // #name-error

    const spanErrorElement = this._formElement.querySelector(span);

    formInput.classList.add(this._validationConfig.inputErrorClass);
    spanErrorElement.textContent = errorMessage;
    spanErrorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(formInput) {
    const span = `#${formInput.id}-error`;
    const spanErrorElement = this._formElement.querySelector(span);

    formInput.classList.remove(this._validationConfig.inputErrorClass);
    spanErrorElement.classList.remove(this._validationConfig.errorClass);
    spanErrorElement.textContent = '';
  }

}

