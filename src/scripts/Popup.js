export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', () => { this._escClosePopup() });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', () => { this._escClosePopup() }) // if anything - delete brackets
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__button-close')) {
        this.close(event.target.closest('.popup'));
      }
    })
  }

  _escClosePopup() {
    if (event.key === "Escape") {
      this._popup.classList.contains('.popup_opened')
      this.close();
    }
  }

}

