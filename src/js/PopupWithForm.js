import { Popup } from "./Popup.js";
import { Form } from "./FormValidator.js";

class PopupWithForm extends Popup {
  constructor(popupElement, submit) {
    super(popupElement);
    this._popupElement = popupElement;
    this._isOpen = false;
    this._overlay = document.querySelector(".overlay");
    this._submit = submit;
  }
  _getInputValues() {
    const inputNameCardPlace = this._popupElement.querySelector(
      ".modal__input_title"
    );
    const inputUrlCardPlace =
      this._popupElement.querySelector(".modal__input_url");
    const nameInput = this._popupElement.querySelector(".modal__input_name");
    const jobInput = this._popupElement.querySelector(".modal__input_job");
    const modalType = this._popupElement.classList[1];
    if (modalType == "modal-place") {
      return {
        inputName: inputNameCardPlace,
        inputInfo: inputUrlCardPlace,
        modal: "palce",
      };
    } else {
      return { inputName: nameInput, inputInfo: jobInput, modal: "profile" };
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      const objConfigPlace = {
        modalForm: this._popupElement,
        valuesInput: {
          titleInput: inputValues.inputName,
          urlInfo: inputValues.inputInfo,
        },
      };

      const titleValidate = new Form(
        objConfigPlace,
        objConfigPlace.valuesInput.titleInput
      );
      const urlValidate = new Form(
        objConfigPlace,
        objConfigPlace.valuesInput.urlInfo
      );
      titleValidate.enableValidation();
      urlValidate.enableValidation();
    });
  }
}
export { PopupWithForm };
