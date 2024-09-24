// @todo: Функция создания карточки
export function createCard(
  itemArr,
  funcDelete,
  funcLike,
  funcOpenPopupPicture,
  myId) {
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

  isLikeCard(itemArr, myId, buttonLike);
  
  imgElement.addEventListener("click", () => funcOpenPopupPicture(imgElement));
  
  buttonLike.addEventListener("click", funcLike);

  if(myCardSearch(itemArr, myId)){
    buttonDelete.addEventListener('click', funcDelete);
  } else {
    buttonDelete.remove()
  }
  
  return elementCard;
}

export function deleteCard(element) {
  element.remove();
}

function myCardSearch(data, myId){
  if(data["owner"]["_id"] === myId){
    return true
  } else {
    return false
  }
}

function funcCountLike (arrLike, element) {
  if(!(arrLike.length === 0)){
  element.textContent = arrLike.length
  } else {
    element.textContent = ''
  }
}

export function isLikeCard (item, myId, element) {
  funcCountLike(item.likes, element.parentElement.querySelector('.card__counter-like'))
  if(checkLike(item.likes, myId)){
    element.classList.add('card__like-button_is-active');
  } else {
    element.classList.remove('card__like-button_is-active');
  }
}

export function checkLike (arrLike, myId){
  if (arrLike.lenght === 0) {
  return false
  }
  return arrLike.some(item =>{return item["_id"] === myId})
}