const profileAddButton = document.querySelector(".profile__add-place");
const profileEdit = document.querySelector(".profile__button");
const modalProfile = document.querySelector(".modal-perfil");
const modalPlace = document.querySelector(".modal-place");
const modalImage = document.querySelector(".modal-img");
const modalCloseImage = document.querySelector(".modal-img__close");
const modalCloseProfile = document.querySelector(".modal__close_icon-perfil ");
const modalClosePlace = document.querySelector(".modal__close_icon-place ");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__rol");
const nameInput = modalProfile.querySelector(".modal__input_name");
const jobInput = modalProfile.querySelector(".modal__input_job");
const inputNameCardPlace = document.querySelector(".modal__input_title");
const inputUrlCardPlace = document.querySelector(".modal__input_url");
const likeButtons = document.querySelectorAll(".places__like");

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
    let cardTitle = cardElement.querySelector(".places__title");
    let cardImage = cardElement.querySelector(".places__image");
    let likeButton = cardElement.querySelector(".places__like");
    let imgCard = cardElement.querySelector(".places__image");
    let trashButton = cardElement.querySelector(".places__trash-icon");

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
    cardImage.src = element.link;

    containerCards.append(cardElement);
  });
});

//Crear card
function crearCard(title, urlImg) {
  const cardElement = templateCard
    .querySelector(".places__element")
    .cloneNode(true);
  let cardTitle = cardElement.querySelector(".places__title");
  let cardImage = cardElement.querySelector(".places__image");
  cardTitle.textContent = title;
  let likeButton = cardElement.querySelector(".places__like");
  let trashButton = cardElement.querySelector(".places__trash-icon");
  let imgCard = cardElement.querySelector(".places__image");

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
  cardImage.src = urlImg;

  containerCards.prepend(cardElement);
}

//Modales
function mostrarModal(modal) {
  modal.classList.toggle("disabled");
  console.log(modal);
}
profileEdit.addEventListener("click", () => {
  mostrarModal(modalProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
modalClosePlace.addEventListener("click", () => {
  mostrarModal(modalPlace);
});
modalCloseProfile.addEventListener("click", () => {
  mostrarModal(modalProfile);
});
modalCloseImage.addEventListener("click", () => {
  mostrarModal(modalImage);
});
function openImgModal(img, title) {
  const imgModal = document.querySelector(".modal-img__src");
  const titleCard = document.querySelector(".modal-img__title");
  imgModal.src = img.src;
  titleCard.textContent = title.textContent;
  console.log(titleCard);
  mostrarModal(modalImage);
}

profileAddButton.addEventListener("click", () => {
  mostrarModal(modalPlace);
});

//Modal Submit
modalProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  nameInput.value = "";
  jobInput.value = "";
  mostrarModal(modalProfile);
});

modalPlace.addEventListener("submit", (e) => {
  e.preventDefault();
  crearCard(inputNameCardPlace.value, inputUrlCardPlace.value);
  inputNameCardPlace.value = "";
  inputUrlCardPlace.value = "";
  mostrarModal(modalPlace);
});

//Eliminar Card
