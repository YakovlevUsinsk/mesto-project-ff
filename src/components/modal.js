import {
  profileName,
  profileDescription,
  popupEditProfile,
  formEditeImage,
  containerCard} from "./constant.js";
import { createCard,
  deleteCard, 
  likeCard } from "./cards.js";

export function closePopup() {
  const popupOpened = document.querySelector(".popup_is-opened");

  popupOpened.classList.remove("popup_is-opened");
  popupOpened
    .querySelector(".popup__close")
    .removeEventListener("click", closePopup);
}

export function handlerOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
    evt.target.removeEventListener("click", handlerOverlay);
  }
}
export function openPopup(classPopup) {
  const popup = document.querySelector(`.${classPopup}`);
  popup.classList.add("popup_is-opened");
  const popupButtonClose = popup.querySelector(".popup__close");
  popupButtonClose.addEventListener("click", closePopup);
  popup.addEventListener("click", handlerOverlay);
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfile["name"].value;
  profileDescription.textContent = popupEditProfile["description"].value;
  evt.target.reset();
  closePopup();
}

export function handleFormSubmitImage(evt) {
  evt.preventDefault();
  const itemCard = {};
  itemCard.name = formEditeImage["place-name"].value;
  itemCard.link = formEditeImage["link"].value;
  const card = createCard(itemCard, deleteCard, likeCard);
  containerCard.prepend(card);
  evt.target.reset();
  closePopup();
}
