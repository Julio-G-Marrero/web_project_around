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
    var userName = document.querySelector(".profile__name");
    var userJob = document.querySelector(".profile__rol");
    if (field == "name") {
      userName.textContent = value;
    } else if (field == "job") {
      userJob.textContent = value;
    }
  }
}
export { UserInfo as User };
