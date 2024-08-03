// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;


// @todo: DOM узлы
const containerCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (itemArr, funcDelete) {

  const elementCard = templateCard.querySelector('.places__item').cloneNode(true);
  const imgElement = elementCard.querySelector('.card__image');
  const titleElement = elementCard.querySelector('.card__title');
  const buttonDelete = elementCard.querySelector('.card__delete-button');

  imgElement.src = itemArr.link;
  imgElement.alt = itemArr.name;
  titleElement.textContent = itemArr.name;
  buttonDelete.addEventListener('click', funcDelete);

  return elementCard;
}

// @todo: Функция удаления карточки
function deleteCard (evt) {
 evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item){
  const card = createCard(item, deleteCard);
  containerCard.append(card)
})