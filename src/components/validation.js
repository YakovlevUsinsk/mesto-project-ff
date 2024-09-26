function showInputError(input, errorMessage, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  const spanElement = document.querySelector(`.${input.id}-error`);
  spanElement.classList.add(errorClass);
  spanElement.textContent = errorMessage;
}

function hidenInputError(input, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  const spanElement = document.querySelector(`.${input.id}-error`);
  spanElement.classList.remove(errorClass);
  spanElement.textContent = ''
}

function chechInputValid(input, inputErrorClass, errorClass) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, inputErrorClass, errorClass)
  } else {
    hidenInputError(input, inputErrorClass, errorClass)
  }
}

function setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const arrayListForms = Array.from(document.querySelectorAll(formSelector));

  arrayListForms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const arrayListInputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector)
    arrayListInputs.forEach((input) => {
      input.addEventListener('input', () => {
        chechInputValid(input, inputErrorClass, errorClass);
        toggleButtonState(arrayListInputs, button, inactiveButtonClass)

      })
    })
  })
}

export function enabledValidation({ formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass }) {
  setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

export function clearValidation(form, config) {
  const arrayListInput = Array.from(form.querySelectorAll(config.inputSelector));
  arrayListInput.forEach((input) => {
    input.value = '';
    hidenInputError(input, config.inputErrorClass, config.errorClass)
  })
  toggleButtonState(arrayListInput, form.querySelector(config.submitButtonSelector), config.inactiveButtonClass)

}