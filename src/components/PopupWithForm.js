import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit = handleSubmit; // функция

    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save');

    this._allInputs = [...this._form.querySelectorAll('.popup__input')]
  }

  _getInputValues() {
    this._inputValues = {}
    this._allInputs.forEach((input) => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  close() {
    super.close()
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmit(this._getInputValues());
    })
    this.close();
  }

  waitingServerAnswer(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text
    } else {
      this._submitButton.textContent = text
    }
  }

}
