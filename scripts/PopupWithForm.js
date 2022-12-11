import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);

    this._submitFormCallback = submitFormCallback; // функция

    this._form = this._popup.querySelector('.popup__form');
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
      this._submitFormCallback(this._getInputValues());
    })
    this.close();
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._form.addEventListener('submit', () => {
  //     this._submitFormCallback()
  //   })
  //   this.close();
  // }

}
