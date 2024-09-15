// @todo: Функция создания карточки
export function createCard(
  itemArr,
  funcDelete,
  funcLike,
  funcOpenPopupPicture
) {
  const templateCard = document.querySelector("#card-template").content;
  const elementCard = templateCard
    .querySelector(".places__item")
    .cloneNode(true);
  const imgElement = elementCard.querySelector(".card__image");
  const titleElement = elementCard.querySelector(".card__title");
  const buttonDelete = elementCard.querySelector(".card__delete-button");
  const buttonLike = elementCard.querySelector(".card__like-button");

  imgElement.src = itemArr.link;
  imgElement.alt = itemArr.name;
  titleElement.textContent = itemArr.name;

  imgElement.addEventListener("click", () => funcOpenPopupPicture(imgElement));
  buttonDelete.addEventListener("click", funcDelete);
  buttonLike.addEventListener("click", funcLike);

  return elementCard;
}

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}