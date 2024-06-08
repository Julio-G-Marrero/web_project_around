class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._overlay = document.querySelector(".overlay");
  }
  open() {
    this._popup.classList.toggle("disabled");
  }

  close() {
    this._popup.classList.toggle("disabled");
    this._overlay.style.display = "none";
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      this._overlay.style.display = "none";
    }
  }
  setEventListeners() {
    this._popup.addEventListener("keydown", function (evt) {
      this._handleEscClose(evt);
    });
    this._overlay.addEventListener("click", function () {
      this._overlay.classList.toggle("disabled");
    });
  }
}
export { Popup };
