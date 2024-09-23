import "./pages/index.css";
import { enabledValidation, 
  clearValidation } from "./components/validation.js";
import { allCard, 
  dataGetProfile, 
  editProfileServer, 
  addCardServer, 
  deleteCardServer, 
  likeCardServer, 
  deleteLikeCardServer } from "./components/api.js";
import { configApi } from "./components/constant.js";
import { createCard, 
  deleteCard,
  isLikeCard,
checkLike} from "./components/card.js";
import { openPopup, 
  closePopup } from "./components/modal.js";

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
  const name = popupEditProfile["name"].value;
  const about = popupEditProfile["description"].value;
  const data = {name, about};
  editProfileServer(configApi, data)
    .then((res)=>{
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const itemCard = {};
  itemCard.name = formEditeImage["place-name"].value;
  itemCard.link = formEditeImage["link"].value;
//
const dataItemCard = addCardServer(configApi, itemCard);

  Promise.all([prof, dataItemCard])
    .then((data)=>{
          const card = createCard(data[1],
            {delete: ()=>{deleteCardServer(configApi, data[1]["_id"]);
              deleteCard(card)}}, 
              likeForCallback, 
              openPopupPicture, 
              data[0]["_id"]);
  containerCard.prepend(card);
    })
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

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
  clearValidation(popupEditProf, configValidation);

  openPopup(popupEditProf);
});
// test js
enabledValidation(configValidation);

const all = allCard(configApi);
const prof = dataGetProfile(configApi);

Promise.all([prof, all])
  .then((res) => {
    const arrayCard = res[1];
    const dataProfile = {name: res[0]["name"], about: res[0]["about"]}
    const myId = res[0]["_id"];
    return { arrayCard, dataProfile, myId };
  })
  .then((data) => {
    data.arrayCard.forEach((item) => {
      const card = createCard(item, 
        {delete: ()=>{
        deleteLikeCardServer(configApi, item["_id"]);
        deleteCard(card)
      }}, 
      ()=>{
        if(checkLike(item.likes, data.myId)){
        deleteLikeCardServer(configApi, item["_id"])
          .then((res)=>{
            item.likes = res.likes;
            isLikeCard(item, data.myId, card.querySelector('.card__like-button'))
          })
        } else {
          likeCardServer(configApi, item["_id"])
            .then((res)=>{
              item.likes = res.likes;
              isLikeCard(item, data.myId, card.querySelector('.card__like-button'))
            })
        }
      },

      openPopupPicture, data.myId);
      containerCard.append(card);
    });
    profileName.textContent = data.dataProfile.name;
    profileDescription.textContent = data.dataProfile.about;
  });
