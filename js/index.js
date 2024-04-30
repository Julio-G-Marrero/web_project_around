const profileAddButton = document.querySelector(".profile__add-place");
const profileEdit = document.querySelector(".profile__button");
const modalProfile = document.querySelector(".modal-perfil");
const modalPlace = document.querySelector(".modal-place");
const modalImage = document.querySelector(".modal-img");
const modalCloseImage = document.querySelector(".modal-img__close");
const modalCloseProfile = document.querySelector(".modal__close-perfil ");
const modalClosePlace = document.querySelector(".modal__close-place ");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__rol");
const nameInput = modalProfile.querySelector(".modal__input_name");
const jobInput = modalProfile.querySelector(".modal__input_job");
const inputNameCardPlace = document.querySelector(".modal__input_title");
const inputUrlCardPlace = document.querySelector(".modal__input_url");
const likeButtons = document.querySelectorAll(".places__like");
const overlay = document.querySelector(".overlay");

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

const containerCards = document.querySelector(".places__elements");
const templateCard = document.querySelector("#cardElement").content;
//Añadir card al cargar
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((element) => {
    const cardElement = templateCard
      .querySelector(".places__element")
      .cloneNode(true);
    const cardTitle = cardElement.querySelector(".places__title");
    const likeButton = cardElement.querySelector(".places__like");
    const imgCard = cardElement.querySelector(".places__image");
    const trashButton = cardElement.querySelector(".places__trash-icon");

    imgCard.addEventListener("click", () => {
      openImgModal(imgCard, cardTitle);
    });
    likeButton.addEventListener("click", (e) => {
      likeButton.classList.toggle("like_active");
    });
    trashButton.addEventListener("click", function () {
      const listItem = trashButton.closest(".places__element");
      listItem.remove();
    });
    cardTitle.textContent = element.name;
    imgCard.src = element.link;
    imgCard.alt = element.name;
    containerCards.append(cardElement);
  });
});

//Crear card
function createCard(title, urlImg) {
  const cardElement = templateCard
    .querySelector(".places__element")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".places__title");
  const likeButton = cardElement.querySelector(".places__like");
  const trashButton = cardElement.querySelector(".places__trash-icon");
  const imgCard = cardElement.querySelector(".places__image");

  imgCard.src = urlImg;
  imgCard.alt = title;
  cardTitle.textContent = title;

  imgCard.addEventListener("click", () => {
    openImgModal(imgCard, cardTitle);
  });
  trashButton.addEventListener("click", function () {
    const listItem = trashButton.closest(".places__element");
    listItem.remove();
  });
  likeButton.addEventListener("click", (e) => {
    likeButton.classList.toggle("like_active");
  });

  containerCards.prepend(cardElement);
}

//Modales
function showModal(modal) {
  modal.classList.toggle("disabled");
  overlay.style.display = "block";
}
profileEdit.addEventListener("click", () => {
  showModal(modalProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
modalClosePlace.addEventListener("click", () => {
  showModal(modalPlace);
  overlay.style.display = "none";
});
modalCloseProfile.addEventListener("click", () => {
  showModal(modalProfile);
  overlay.style.display = "none";
});
modalCloseImage.addEventListener("click", () => {
  showModal(modalImage);
  overlay.style.display = "none";
});
function openImgModal(img, title) {
  const imgModal = document.querySelector(".modal-img__src");
  const titleCard = document.querySelector(".modal-img__title");
  imgModal.src = img.src;
  titleCard.textContent = title.textContent;
  showModal(modalImage);
}

profileAddButton.addEventListener("click", () => {
  showModal(modalPlace);
});

//Modal Submit
modalProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameInput.value != "" && jobInput.value != "") {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    nameInput.value = "";
    jobInput.value = "";
    showModal(modalProfile);
    overlay.style.display = "none";
  }
});

modalPlace.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputNameCardPlace.value != "" && inputUrlCardPlace.value != "") {
    createCard(inputNameCardPlace.value, inputUrlCardPlace.value);
    inputNameCardPlace.value = "";
    inputUrlCardPlace.value = "";
    showModal(modalPlace);
    overlay.style.display = "none";
  }
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
