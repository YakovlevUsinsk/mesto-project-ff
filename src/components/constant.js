export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Темплейт карточки
export const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
export const containerCard = document.querySelector(".places__list");
export const allPopup = document.querySelectorAll(".popup");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const popupEditProfile = document.forms["edit-profile"];
export const formEditeImage = document.forms["new-place"];
export const buttoAddCard = document.querySelector(".profile__add-button");
export const buttoEditeProfile = document.querySelector(".profile__edit-button");
export const popupImage = document.querySelector(".popup_type_image");
export const popupImagePicture = popupImage.querySelector(".popup__image");
export const popupImageTitle = popupImage.querySelector(".popup__caption");
export const popupOpened = document.querySelector(".popup_is-opened");