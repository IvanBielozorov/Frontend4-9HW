const refs = {
  name: document.querySelector(".js-name"),
  lastName: document.querySelector(".js-last-name"),
  tel: document.querySelector(".js-tel"),
  email: document.querySelector(".js-email"),
  subBtn: document.querySelector(".sub-btn"),
  form: document.querySelector(".js-form")
};

refs.form.addEventListener("click", onSubBtnClick);

function onSubBtnClick(e) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(Object.fromEntries(formData));
}
