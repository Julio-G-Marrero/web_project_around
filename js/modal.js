let profile_add_Button = document.querySelector(".profile__add-place");
let profile_edit = document.querySelector(".profile__button");
let modal_profile = document.querySelector(".modal-perfil");
let modal_place = document.querySelector(".modal-place");
let modal_close_profile = document.querySelector(".modal__close--perfil");
let modal_close_place = document.querySelector(".modal__close--place");
function mostrarModal(modal) {
  modal.classList.toggle("disabled");
}
profile_edit.addEventListener("click", () => {
  mostrarModal(modal_profile);
});
modal_close_place.addEventListener("click", () => {
  mostrarModal(modal_place);
});
modal_close_profile.addEventListener("click", () => {
  mostrarModal(modal_profile);
});
profile_add_Button.addEventListener("click", () => {
  mostrarModal(modal_place);
});
