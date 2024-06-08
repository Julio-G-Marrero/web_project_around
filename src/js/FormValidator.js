import { PopupWithForm } from "./PopupWithForm.js";
import { Card } from "./Card.js";
import { User } from "./UserInfo.js";

const overlay = document.querySelector(".overlay");
const modalProfile = new PopupWithForm(document.querySelector(".modal-perfil"));
const modalPlace = new PopupWithForm(
  document.querySelector(".modal-place"),
  "submit"
);

const inputNameCardPlace = document.querySelector(".modal__input_title");
const inputUrlCardPlace = document.querySelector(".modal__input_url");

const containerCards = document.querySelector(".places__elements");

const newUser = new User({});
class FormValidator {
  constructor(objConfig, toValidate) {
    this._objConfig = objConfig;
    this._toValidate = toValidate;
  }
  enableValidation() {
    this._setValidation();
  }
  _setValidation() {
    const typeModal = this._objConfig.modalForm.classList[1];
    let classInput = this._toValidate.classList.value;
    classInput = "." + classInput.replaceAll(" ", ".");
    const inputValue = document.querySelector(classInput);

    if (inputValue.value != "") {
      let classElement = "";
      if (typeModal == "modal-place") {
        const card = new Card(
          inputNameCardPlace.value,
          inputUrlCardPlace.value,
          "#cardElement"
        );
        const newCard = card.createCard();
        containerCards.prepend(newCard);
        inputNameCardPlace.value = "";
        inputUrlCardPlace.value = "";

        modalPlace.close();
        return newCard;
      } else if (typeModal == "modal-perfil") {
        if (this._toValidate.id == "name-input") {
          newUser.setUserInfo("name", inputValue.value);
        } else if (this._toValidate.id == "profesion-input") {
          modalProfile.close();
          newUser.setUserInfo("job", inputValue.value);
        }
      } else {
        return;
      }
    }
  }
}
modalPlace.setEventListeners();
modalProfile.setEventListeners();

export { FormValidator as Form };
