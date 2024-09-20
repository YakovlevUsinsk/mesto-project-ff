import "./pages/index.css";
import {enabledValidation, clearValidation} from "./components/validation.js";

import { initialCards } from "./components/constant.js";
import { createCard,
  deleteCard,
  likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// @todo: DOM узлы
const containerCard = document.querySelector(".places__list");

const allPopup = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const buttoEditeProfile = document.querySelector(".profile__edit-button");
const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__caption");
const popupEditProf = document.querySelector(".popup_type_edit");
const buttoAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEditProfile = document.forms["edit-profile"];
const formEditeImage = document.forms["new-place"];
const popupAdPicture = document.querySelector(".popup_type_new-card");

function openPopupPicture(data) {
  popupImagePicture.src = data.src;
  popupImageTitle.textContent = data.alt;
  openPopup(popupImage);
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfile["name"].value;
  profileDescription.textContent = popupEditProfile["description"].value;
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const itemCard = {};
  itemCard.name = formEditeImage["place-name"].value;
  itemCard.link = formEditeImage["link"].value;
  const card = createCard(itemCard, deleteCard, likeCard);
  containerCard.prepend(card);
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, likeCard, openPopupPicture);
  containerCard.append(card);
});

buttoAddCard.addEventListener("click", () => {
  formEditeImage.reset();
  clearValidation(popupAdPicture, configValidation);
  openPopup(popupAdPicture);
});

allPopup.forEach((item) => item.classList.add("popup_is-animated"));

allPopup.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

allPopup.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditeImage.addEventListener("submit", handleCardFormSubmit);

popupEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttoEditeProfile.addEventListener("click", () => {
  popupEditProfile["name"].value = profileName.textContent;
  popupEditProfile["description"].value = profileDescription.textContent;
  clearValidation(popupEditProf, configValidation)

  openPopup(popupEditProf);
});
// test js 
enabledValidation(configValidation);