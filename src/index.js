import "./pages/index.css";

import {
  initialCards,
  containerCard,
  allPopup,
  profileName,
  profileDescription,
  popupEditProfile,
  formEditeImage,
  buttoAddCard,
  buttoEditeProfile} from "./components/constant.js";
import { createCard, 
  deleteCard, 
  likeCard } from "./components/cards.js";
import {
  openPopup,
  closePopup,
  handleFormSubmit,
  handleFormSubmitImage} from "./components/modal.js";
  

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, likeCard);
  containerCard.append(card);
});

buttoAddCard.addEventListener("click", () => {
  formEditeImage.reset();
  openPopup("popup_type_new-card");
});

window.addEventListener("keydown", (evt) => {
  if (document.querySelector(".popup_is-opened") && evt.key === "Escape") {
    closePopup();
  }
});

allPopup.forEach((item) => item.classList.add("popup_is-animated"));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditeImage.addEventListener("submit", handleFormSubmitImage);

popupEditProfile.addEventListener("submit", handleFormSubmit);

buttoEditeProfile.addEventListener("click", () => {
  popupEditProfile["name"].value = profileName.textContent;
  popupEditProfile["description"].value = profileDescription.textContent;
  openPopup("popup_type_edit");
});
