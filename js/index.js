const profileAddButton = document.querySelector(".profile__add-place");
const profileEdit = document.querySelector(".profile__button");
const modalProfile = document.querySelector(".modal-perfil");
const modalPlace = document.querySelector(".modal-place");
const modalCloseProfile = document.querySelector(".modal__close-perfil");
const modalClosePlace = document.querySelector(".modal__close-place");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__rol");
const nameInput = modalProfile.querySelector(".modal__input_name");
const jobInput = modalProfile.querySelector(".modal__input_job");

function mostrarModal(modal) {
  modal.classList.toggle("disabled");
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
profileAddButton.addEventListener("click", () => {
  mostrarModal(modalPlace);
});
modalProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  nameInput.value = "";
  jobInput.value = "";
  mostrarModal(modalProfile);
});
