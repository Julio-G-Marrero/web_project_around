import { showModal } from "./utils.js";
import { Card } from "./Card.js";

const modalProfile = document.querySelector(".modal-perfil");
const nameInput = modalProfile.querySelector(".modal__input_name");
const jobInput = modalProfile.querySelector(".modal__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__rol");
const overlay = document.querySelector(".overlay");

const modalPlace = document.querySelector(".modal-place");
const inputNameCardPlace = document.querySelector(".modal__input_title");
const inputUrlCardPlace = document.querySelector(".modal__input_url");

const containerCards = document.querySelector(".places__elements");

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
    console.log(typeModal);

    if (inputValue.value != "") {
      let classElement = "";
      if (typeModal == "modal-place") {
        console.log("place");
        const card = new Card(
          inputNameCardPlace.value,
          inputUrlCardPlace.value,
          "#cardElement"
        );
        const newCard = card.createCard();
        containerCards.prepend(newCard);
        inputNameCardPlace.value = "";
        inputUrlCardPlace.value = "";
        showModal(modalPlace);
        overlay.style.display = "none";
        return newCard;
      } else if (typeModal == "modal-perfil") {
        console.log("perfil");
        if (this._toValidate.id == "name-input") {
          classElement =
            this._objConfig.contaierHtml.profileName.classList.value;
          classElement = document.querySelector("." + classElement);
          classElement.textContent = inputValue.value;
          inputValue.value = "";
          showModal(modalProfile);
          overlay.style.display = "none";
        } else if (this._toValidate.id == "profesion-input") {
          classElement =
            this._objConfig.contaierHtml.profileJob.classList.value;
          classElement = document.querySelector("." + classElement);
          classElement.textContent = inputValue.value;
          inputValue.value = "";
          showModal(modalProfile);
          overlay.style.display = "none";
        }
      } else {
        return;
      }
    }
  }
}

modalProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  const objConfigProfile = {
    modalForm: modalProfile,
    valuesInput: {
      nameInput: nameInput,
      jobInput: jobInput,
    },
    contaierHtml: {
      profileName: profileName,
      profileJob: profileJob,
    },
  };

  const validateName = new FormValidator(
    objConfigProfile,
    objConfigProfile.valuesInput.nameInput
  );
  const ValidateJob = new FormValidator(
    objConfigProfile,
    objConfigProfile.valuesInput.jobInput
  );

  validateName.enableValidation();
  ValidateJob.enableValidation();
});
modalPlace.addEventListener("submit", (e) => {
  e.preventDefault();
  const objConfigPlace = {
    modalForm: modalPlace,
    valuesInput: {
      titleInput: inputNameCardPlace,
      urlInput: inputUrlCardPlace,
    },
  };

  const titleValidate = new FormValidator(
    objConfigPlace,
    objConfigPlace.valuesInput.titleInput
  );
  const urlValidate = new FormValidator(
    objConfigPlace,
    objConfigPlace.valuesInput.urlInput
  );
  titleValidate.enableValidation();
  urlValidate.enableValidation();
});
export { FormValidator as Form };
