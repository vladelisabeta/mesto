export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseByEsc = this._handleCloseByEsc.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseByEsc); // возмножно придется байндить
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseByEsc) // if anything - delete brackets
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__button-close')) {
        this.close();
      }
    })
  }

  _handleCloseByEsc() {
    if (event.key === "Escape") {
      this.close();
    }
  }

}

