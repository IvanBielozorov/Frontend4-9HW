const refs = {
  name: document.querySelector(".js-name"),
  lastName: document.querySelector(".js-last-name"),
  tel: document.querySelector(".js-tel"),
  email: document.querySelector(".js-email"),
  subBtn: document.querySelector(".sub-btn"),
  form: document.querySelector(".js-form"),
  infoContacts: document.querySelector(".info-contacts"),
  removeAll: document.querySelector(".js-remove-all"),
  removeContact: document.querySelector(".js-remove-contact"),
  telRemove: document.querySelector(".tel-remove"),
};

refs.form.addEventListener("submit", onSubBtnClick);
refs.form.addEventListener("input", onFormInput);

let contactsArr = JSON.parse(localStorage.getItem("contacts")) || [];

function onSubBtnClick(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const contact = Object.fromEntries(formData);
  contactsArr.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contactsArr));
  renderContacts();
}

function renderContacts() {
  refs.infoContacts.innerHTML = "";

  contactsArr.forEach((contact) => {
    refs.infoContacts.insertAdjacentHTML(
      "beforeend",
      `
      <p>Name: ${contact.name}</p>
      <p>Last name: ${contact.lastName}</p>
      <p>Telephone: ${contact.telephone}</p>
      <p>Email: ${contact.email}</p>
      <hr>
      `,
    );
  });
}
renderContacts();

refs.removeAll.addEventListener("click", onRemoveAllClick);
function onRemoveAllClick(e) {
  refs.infoContacts.innerHTML = "";
  localStorage.clear();
  contactsArr = [];
}

refs.removeContact.addEventListener("click", onRemoveContactClick);
function onRemoveContactClick(e) {
  const telNum = refs.telRemove.value;

  contactsArr = contactsArr.filter((contact) => {
    return contact.telephone !== telNum;
  });

  localStorage.setItem("contacts", JSON.stringify(contactsArr));

  renderContacts();
}


function onFormInput() {
  const formData = new FormData(refs.form);
  const data = Object.fromEntries(formData);

  localStorage.setItem("formData", JSON.stringify(data));
}

function restoreFormData() {
  const savedData = JSON.parse(localStorage.getItem("formData"));

  if (!savedData) return;

  refs.name.value = savedData.name || "";
  refs.lastName.value = savedData.lastName || "";
  refs.tel.value = savedData.telephone || "";
  refs.email.value = savedData.email || "";
};
restoreFormData()