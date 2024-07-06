import { openModal } from "./utils.js";
class Card {
  constructor(title, image, selector, likes, isOwner, idCard) {
    this._title = title;
    this._image = image;
    this._selector = selector;
    this._likes = likes;
    this._isOwner = isOwner;
    this._id = idCard;
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
    trashButton.addEventListener("click", function (e) {
      const idCardElement = e.target.id;
      const modalTrashImg = document.querySelector(".modal-img-delete");
      const deleteBtn = document.querySelector(".modal-img-delete__button");
      deleteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        fetch(
          `https://around.nomoreparties.co/v1/web_es_11/cards/${idCardElement}`,
          {
            method: "DELETE",
            headers: {
              authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            location.reload();
          } else {
            alert("Algo salio mal ...");
          }
        });
      });
      const overlay = document.querySelector(".overlay");
      modalTrashImg.classList.toggle("disabled");
      overlay.style.display = "block";
    });

    likeButton.addEventListener("click", function (e) {
      likeButton.classList.toggle("like_active");

      let idCardElement = e.target.parentElement.value;
      if (likeButton.classList[1]) {
        fetch(
          `https://around.nomoreparties.co/v1/web_es_11/cards/likes/${idCardElement}`,
          {
            method: "PUT",
            headers: {
              authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(e.target.parentElement);
            let likesCountText = e.target.nextSibling.nextSibling;
            if (data.likes.length > 0) {
              likesCountText.textContent = data.likes.length;
            } else {
              likesCountText.textContent = 0;
            }
          });
      } else {
        fetch(
          `https://around.nomoreparties.co/v1/web_es_11/cards/likes/${idCardElement}`,
          {
            method: "DELETE",
            headers: {
              authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(e.target.parentElement);

            let likesCountText = e.target.nextSibling.nextSibling;
            if (data.likes.length > 0) {
              likesCountText.textContent = data.likes.length;
            } else {
              likesCountText.textContent = 0;
            }
          });
      }
    });
  }

  createCard() {
    const templateCard = this._getTemplate();
    const cardTitle = templateCard.querySelector(".places__title");
    const likeButton = templateCard.querySelector(".places__like");
    const likesHtml = templateCard.querySelector(".places__likes");
    const trashButton = templateCard.querySelector(".places__trash-icon");
    const imgCard = templateCard.querySelector(".places__image");
    const modalImg = templateCard.querySelector(".modal-img-delete");
    likeButton.value = this._id;
    imgCard.src = this._image;
    imgCard.alt = this._title;
    trashButton.id = this._id;
    if (this._likes == 0) {
      likesHtml.textContent = 0;
    } else {
      likesHtml.textContent = this._likes;
    }
    if (this._isOwner == false) {
      trashButton.classList.add("disabled");
    }
    this._setEventListeners(imgCard, likeButton, trashButton, likeButton);
    cardTitle.textContent = this._title;

    return templateCard;
  }
}

export { Card };
