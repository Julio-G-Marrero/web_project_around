import { PopupWithForm } from "./PopupWithForm.js";
import { Card } from "./Card.js";
import { User } from "./UserInfo.js";

let userName = "";
let userJob = "";

fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
  headers: {
    authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
  },
})
  .then((response) => response.json())
  .then((data) => setInitailUserInfo(data));

function setInitailUserInfo(data) {
  userName = data.name;
  userJob = data.about;
}

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
        fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
          method: "POST",
          headers: {
            authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputNameCardPlace.value,
            link: inputUrlCardPlace.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const idTrash = document.querySelector(".places__trash-icon");
            const idLike = document.querySelector(".places__like");
            idTrash.id = data._id;
            idLike.value = data._id;
          });

        const card = new Card(
          inputNameCardPlace.value,
          inputUrlCardPlace.value,
          "#cardElement",
          0,
          true
        );
        const newCard = card.createCard();
        containerCards.prepend(newCard);
        inputNameCardPlace.value = "";
        inputUrlCardPlace.value = "";
        modalPlace.close();
        return newCard;
      } else if (typeModal == "modal-perfil") {
        if (this._toValidate.id == "name-input") {
          fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
            method: "PATCH",
            headers: {
              authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: inputValue.value,
              about: userJob,
            }),
          });
          userName = inputValue.value;
          newUser.setUserInfo("name", inputValue.value);
        } else if (this._toValidate.id == "profesion-input") {
          modalProfile.close();
          fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
            method: "PATCH",
            headers: {
              authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userName,
              about: inputValue.value,
            }),
          });
          userJob = inputValue.value;

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
