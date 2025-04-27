import{linkLogin,buttonModify,editMode,modal,galeryModale,modalTitle,returnGModal,formAddphotos,addImage,imageElements,partialBorderGallery} from "../script.js";
import {openModal} from "./openModal.js";
import {closeModal} from "./closeModal.js";
import {resetSection} from "./resetSection.js"
import {returnGalleryModal} from "./returnGalleryModal.js"
import {updateButtonColor} from "./updateButtonColor.js"

function handleLogout(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  updateLoginState();
}

export const updateLoginState = () => {
  linkLogin.removeEventListener("click", handleLogout);
    if (sessionStorage.getItem("token")) {
      document.querySelector(".filter-nav").style.display = "none";
      linkLogin.textContent = "Logout";
      linkLogin.href = "#";
      editMode.style.display = "flex";
      buttonModify.addEventListener("click", openModal);
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
      linkLogin.addEventListener("click", handleLogout);
      addImage.addEventListener("click", (event) => {
        updateButtonColor();
        partialBorderGallery.style.display = "none";
        galeryModale.style.display = "none";
        modalTitle.innerHTML = "Ajout photo"
        event.preventDefault();
        imageElements.style.display = "flex";
        const categoryArray = JSON.parse(sessionStorage.getItem("categories"));
        const categoriesSelectElement = document.getElementById("photoCategory");
        if (categoriesSelectElement.options.length === 1) {
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
        returnGModal.style.display = "block";
        returnGModal.addEventListener("click",returnGalleryModal);
      });
    } else {  
      document.querySelector(".filter-nav").style.display = "flex";
      linkLogin.textContent = "Login";
      linkLogin.href = "login.html";
      buttonModify.style.display = "none";
      buttonModify.removeEventListener("click", openModal);
      returnGModal.removeEventListener("click",returnGalleryModal);
      editMode.style.display = "none";
      resetSection(galeryModale);
    }
  };