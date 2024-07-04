var userName = document.querySelector(".profile__name");
var userJob = document.querySelector(".profile__rol");
var userAvatar = document.querySelector(".profile__avatar-img");
var idUser = 0;
class UserInfo {
  constructor(objElements) {
    this._objElements = objElements;
  }

  getUserInfo(field) {
    if (field == "name") {
      return this._objElements["name"].textContent;
    } else if (field == "job") {
      return this._objElements["job"].textContent;
    }
  }
  setUserInfo(field, value) {
    //Toma los datos del nuevo usuario y los agrega en la pagina
    if (field == "name") {
      userName.textContent = value;
    } else if (field == "job") {
      userJob.textContent = value;
    }
  }
}
fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
  headers: {
    authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
  },
})
  .then((response) => response.json())
  .then((data) => setInitailUserInfo(data));

function setInitailUserInfo(data) {
  userName.textContent = data.name;
  userJob.textContent = data.about;
  userAvatar.src = data.avatar;
  idUser = data._id;
}

export { UserInfo as User, idUser as idUser };
