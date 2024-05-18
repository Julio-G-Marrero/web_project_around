import { openModal } from "./utils.js";

class Card {
  constructor(title, image, selector) {
    this._title = title;
    this._image = image;
    this._selector = selector;
  }

  _getTemplate() {
    const templateCard = document
      .querySelector(this._selector)
      .content.querySelector(".places__element")
      .cloneNode(true);
    return templateCard;
  }

  _setEventListeners(imgCard, likeButton, trashButton) {
    imgCard.addEventListener("click", () => {
      openModal(this._image, this._title);
    });
    likeButton.addEventListener("click", (e) => {
      likeButton.classList.toggle("like_active");
    });
    trashButton.addEventListener("click", function () {
      const listItem = trashButton.closest(".places__element");
      listItem.remove();
    });
  }

  createCard() {
    const templateCard = this._getTemplate();
    const cardTitle = templateCard.querySelector(".places__title");
    const likeButton = templateCard.querySelector(".places__like");
    const trashButton = templateCard.querySelector(".places__trash-icon");
    const imgCard = templateCard.querySelector(".places__image");
    imgCard.src = this._image;
    imgCard.alt = this._title;
    this._setEventListeners(imgCard, likeButton, trashButton);
    cardTitle.textContent = this._title;

    return templateCard;
  }
}
export { Card };
