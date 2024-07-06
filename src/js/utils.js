const modalPlace = document.querySelector(".modal-place");
const modalImage = document.querySelector(".modal-img");
const modalProfile = document.querySelector(".modal-perfil");
const overlay = document.querySelector(".overlay");
const profileEdit = document.querySelector(".profile__button");
const modalClosePlace = document.querySelector(".modal__close-place ");
const modalCloseProfile = document.querySelector(".modal__close-perfil ");
const modalCloseProfileImg = document.querySelector(
  ".modal__close-imgProfile "
);
const modalCloseImage = document.querySelector(".modal-img__close");
const profileAddButton = document.querySelector(".profile__add-place");
const nameInput = modalProfile.querySelector(".modal__input_name");
const jobInput = modalProfile.querySelector(".modal__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__rol");

function showModal(modal) {
  modal.classList.toggle("disabled");
  overlay.style.display = "block";
}
function openImgModal(img, title) {
  const imgModal = document.querySelector(".modal-img__src");
  const titleCard = document.querySelector(".modal-img__title");
  imgModal.src = img;
  titleCard.textContent = title;
  showModal(modalImage);
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
modalCloseProfileImg.addEventListener("click", () => {
  showModal(modalProfile);
  overlay.style.display = "none";
});
modalCloseImage.addEventListener("click", () => {
  showModal(modalImage);
  overlay.style.display = "none";
});
profileAddButton.addEventListener("click", () => {
  showModal(modalPlace);
});
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

export { openImgModal as openModal, showModal, modalProfile };
