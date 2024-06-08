import { Popup } from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._overlay = document.querySelector(".overlay");
  }
  open(img, tittle) {
    this._popup.classList.toggle("disabled");
  }
}
export { PopupWithImage };
