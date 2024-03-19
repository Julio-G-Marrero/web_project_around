let profileAddButton = document.querySelector(".profile__add-place");
let profileEdit = document.querySelector(".profile__button");
let modalProfile = document.querySelector(".modal-perfil");
let modalPlace = document.querySelector(".modal-place");
let modalCloseProfile = document.querySelector(".modal__close--perfil");
let modalClosePlace = document.querySelector(".modal__close--place");
function mostrarModal(modal) {
  modal.classList.toggle("disabled");
}
profileEdit.addEventListener("click", () => {
  mostrarModal(modalProfile);
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
