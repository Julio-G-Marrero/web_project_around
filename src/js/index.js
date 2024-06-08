import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { User } from "./UserInfo.js";

const overlay = document.querySelector(".overlay");
var userName = document.querySelector(".profile__name");
var userJob = document.querySelector(".profile__rol");
const userObj = {
  name: userName,
  job: userJob,
};
const user = new User(userObj);
userName.textContent = user.getUserInfo("name");
userJob.textContent = user.getUserInfo("job");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//Añadir card al cargar
const loadCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#cardElement");
      const cardElement = card.createCard();
      loadCards.addItem(cardElement);
    },
  },
  ".places__elements"
);
loadCards.renderer();

//validacion forms
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  console.log(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  const modals = document.querySelectorAll(".modal");
  const images = document.querySelectorAll(".modal-img");
  images.forEach(function (img) {
    img.classList.add("disabled");
  });
  modals.forEach(function (modal) {
    modal.classList.add("disabled");
  });
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    const images = document.querySelectorAll(".modal-img");
    images.forEach(function (img) {
      img.classList.add("disabled");
    });
    modals.forEach(function (modal) {
      modal.classList.add("disabled");
    });
    overlay.style.display = "none";
  }
});
