export default function renderLoading(form, boolen) {
  const button = form.querySelector('button[type="submit"]');
  if (boolen) {
    button.textContent = "Сохранить"
  } else {
    button.textContent = "Сохранение..."
  }
}