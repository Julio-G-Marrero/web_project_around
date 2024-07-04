import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { User, idUser } from "./UserInfo.js";

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

const initialCards = [];
function setInitailCards(data) {
  var isOwner = false;

  for (var i = 0; i <= 5; i++) {
    var likesCard = data[i].likes;
    var isLiked = false;
    likesCard.forEach((like) => {
      if (like._id == idUser) {
        isLiked = true;
      }
    });
    if (data[i].owner._id == idUser) {
      isOwner = true;
    } else {
      var isOwner = false;
    }
    initialCards.push({
      name: data[i].name,
      link: data[i].link,
      likes: data[i].likes,
      owner: isOwner,
      idCard: data[i]._id,
      isLiked: isLiked,
    });
  }
}

fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
  headers: {
    authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
  },
})
  .then((response) => response.json())
  .then((data) => setInitailCards(data))
  .then(() => {
    //Añadir card al cargar
    const loadCards = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item.name,
            item.link,
            "#cardElement",
            item.likes.length,
            item.owner,
            item.idCard
          );
          const cardElement = card.createCard();
          if (item.isLiked) {
            var styleLiked = cardElement.querySelector(".places__like");
            styleLiked.classList.add("like_active");
          }
          loadCards.addItem(cardElement);
        },
      },
      ".places__elements"
    );

    loadCards.renderer();
  });

//Cmbair img perfil
var editProfileBtn = document.querySelector(".profile__avatar_edit-img");
var editImgProfile = document.querySelector(".modal-profile-img");
editProfileBtn.addEventListener("click", function () {
  editImgProfile.classList.toggle("disabled");
  const overlay = document.querySelector(".overlay");
  const newUrl = document.querySelector("#url-img");
  const btnGuardar = document.querySelector(".modal__button-img-Edit");
  overlay.style.display = "block";

  btnGuardar.addEventListener("click", function () {
    fetch("https://around.nomoreparties.co/v1/web_es_11/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newUrl.value,
      }),
    }).then((res) => {
      if (res.ok) {
        const imgProfile = document.querySelector(".profile__avatar_img");
        imgProfile.src = newUrl.value;
        editImgProfile.classList.toggle("disabled");
        overlay.style.display = "none";
      } else {
        alert("Algo salio mal ...");
      }
    });
  });
});

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
