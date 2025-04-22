import{linkLogin,buttonModify,editMode,modal,galeryModale} from "../script.js";
import {openModal} from "./openModal.js";
import {closeModal} from "./closeModal.js";
import {resetSection} from "./resetSection.js"

function handleLogout(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  updateLoginState();
}

export const updateLoginState = () => {
  linkLogin.removeEventListener("click", handleLogout);
    if (sessionStorage.getItem("token")) {
      const addImage = document.getElementById("add-image");
      linkLogin.textContent = "Logout";
      linkLogin.href = "#";
      editMode.style.display = "block";
      buttonModify.addEventListener("click", openModal);
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
      linkLogin.addEventListener("click", handleLogout);
      addImage.addEventListener("click", (event) => {
        event.preventDefault();
        const formAddphotos = document.getElementById("addPhotoForm");
        const headModal = document.getElementById("modal-header");
        const categoryArray = JSON.parse(sessionStorage.getItem("categories"));
        const categoriesSelectElement = document.getElementById("photoCategory");
        if (categoriesSelectElement.options.length === 0) {
          var emptyOption = document.createElement("option");
          emptyOption.value = "";
          emptyOption.text = ""; 
          categoriesSelectElement.append(emptyOption);
          categoryArray.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.id;
            option.text = item.name;
            categoriesSelectElement.append(option);
          });
        }
        formAddphotos.style.display = "block";
        addImage.style.display = "none";
        resetSection(galeryModale);
        headModal.style.display = "none";
      });
    } else {
      linkLogin.textContent = "Login";
      linkLogin.href = "login.html";
      buttonModify.style.display = "none";
      buttonModify.removeEventListener("click", openModal);
      editMode.style.display = "none";
      resetSection(galeryModale);
    }
  };