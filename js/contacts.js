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
  editForm: document.querySelector(".js-edit-contacts"),
  telFind: document.querySelector(".tel-find"),
  editName: document.querySelector(".edit-name"),
  editLastName: document.querySelector(".edit-last-name"),
  editTel: document.querySelector(".edit-tel"),
  editEmail: document.querySelector(".edit-email"),
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
}
restoreFormData();

refs.editForm.addEventListener("submit", onEditFormSubmit);

function onEditFormSubmit(event) {
  event.preventDefault();

  const telNum = refs.telFind.value;

   const contactToEdit = contactsArr.find(
     (contact) => contact.telephone === telNum,
   );

  // if (!contactToEdit) return;
  if (!contactToEdit) {
    alert("Contact not found");
    return
  }

   if (refs.editName.value !== "") {
     contactToEdit.name = refs.editName.value;
  }

   if (refs.editLastName.value !== "") {
     contactToEdit.lastName = refs.editLastName.value;
   }

   if (refs.editTel.value !== "") {
     contactToEdit.telephone = refs.editTel.value;
   }

   if (refs.editEmail.value !== "") {
     contactToEdit.email = refs.editEmail.value;
   }

   localStorage.setItem("contacts", JSON.stringify(contactsArr));

   renderContacts();
}
