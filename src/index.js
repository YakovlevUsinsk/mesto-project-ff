import "./pages/index.css";
import { enabledValidation, clearValidation, } from "./components/validation.js";
import {
  allCard,
  dataGetProfile,
  editProfileServer,
  addCardServer,
  deleteCardServer,
  likeCardServer,
  deleteLikeCardServer,
  avatarEditServer,
} from "./components/api.js";
import { configApi } from "./components/constant.js";
import {
  createCard,
  deleteCard,
  isLikeCard,
  checkLike,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

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
const popupEditeAvatar = document.querySelector(".popup_type_avatar")
const popupEditProf = document.querySelector(".popup_type_edit");
const buttoAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEditProfile = document.forms["edit-profile"];
const formEditeImage = document.forms["new-place"];
const formEditAvatar = document.forms["avatar"];
const popupAdPicture = document.querySelector(".popup_type_new-card");
const avatarImage = document.querySelector('.profile__image');
const avatarButtonAddPopup = document.querySelector('.wrapper');

function handlerDeleteCard(item, card) {
  deleteCardServer(configApi, item["_id"]);
  deleteCard(card);
}

function handlerFunctionLike(item, data, card) {
  if (checkLike(item.likes, data.myId)) {
    deleteLikeCardServer(configApi, item["_id"]).then((res) => {
      item.likes = res.likes;
      isLikeCard(item, data.myId, card.querySelector(".card__like-button"));
    });
  } else {
    likeCardServer(configApi, item["_id"]).then((res) => {
      item.likes = res.likes;
      isLikeCard(item, data.myId, card.querySelector(".card__like-button"));
    });
  }
}

function messageResponse(form, boolen) {
  const button = form.querySelector('button[type="submit"]');
  if (boolen) {
    button.textContent = "Сохранить"
  } else {
    button.textContent = "Сохранение..."
  }
}


function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  messageResponse(popupEditeAvatar, false);
  const avatarUrl = formEditAvatar["link"].value;
  const url = { avatar: avatarUrl }
  avatarEditServer(configApi, url)
    .then((res) => {
      avatarImage.src = res["avatar"];
    })
    .catch((err) => {
      console.log(res)
    })
    .finally(function () {
      messageResponse(popupEditeAvatar, true);
    })
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}


function openPopupPicture(data) {
  popupImagePicture.src = data.src;
  popupImageTitle.textContent = data.alt;
  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  messageResponse(popupEditProfile, false);
  const name = popupEditProfile["name"].value;
  const about = popupEditProfile["description"].value;
  const data = { name, about };
  editProfileServer(configApi, data)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      messageResponse(popupEditProfile, true);
    });
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  messageResponse(formEditeImage, false);
  const itemCard = {};
  itemCard.name = formEditeImage["place-name"].value;
  itemCard.link = formEditeImage["link"].value;
  const dataItemCard = addCardServer(configApi, itemCard);

  Promise.all([prof, dataItemCard])
    .then((res) => {
      const item = res[1];
      const dataProfile = { name: res[0]["name"], about: res[0]["about"] };
      const myId = res[0]["_id"];
      return { item, dataProfile, myId };
    })
    .then((data) => {
      const item = data.item;
      const card = createCard(
        item,
        () => { handlerDeleteCard(item, card) },
        () => { handlerFunctionLike(item, data, card) },
        openPopupPicture,
        data.myId
      );
      containerCard.prepend(card);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      messageResponse(formEditeImage, true);
    });
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

formEditAvatar.addEventListener('submit', handleAvatarFormSubmit)

buttoEditeProfile.addEventListener("click", () => {
  popupEditProfile["name"].value = profileName.textContent;
  popupEditProfile["description"].value = profileDescription.textContent;
  clearValidation(popupEditProf, configValidation);
  openPopup(popupEditProf);
});

avatarButtonAddPopup.addEventListener('click', () => {
  clearValidation(formEditAvatar, configValidation);
  openPopup(popupEditeAvatar);
})

// Подключение валидации
enabledValidation(configValidation);

const all = allCard(configApi)
const prof = dataGetProfile(configApi);

Promise.all([prof, all])
  .then((res) => {
    const arrayCard = res[1];
    const dataProfile = { name: res[0]["name"], about: res[0]["about"] };
    const myId = res[0]["_id"];
    avatarImage.src = res[0]["avatar"];
    return { arrayCard, dataProfile, myId };
  })
  .then((data) => {
    data.arrayCard.forEach((item) => {
      const card = createCard(
        item,
        () => { handlerDeleteCard(item, card) },
        () => { handlerFunctionLike(item, data, card) },
        openPopupPicture,
        data.myId
      );
      containerCard.append(card);
    });
    profileName.textContent = data.dataProfile.name;
    profileDescription.textContent = data.dataProfile.about;
  })
  .catch((err) => {
    console.log(err)
  });