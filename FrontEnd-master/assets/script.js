
const filterContainer = document.createElement("nav");
import {fetchWorks} from "./modulesJs/fetchWorks.js";
import {displayGallery} from "./modulesJs/displayGallery.js";
import {fetchCategories} from "./modulesJs/fetchCategories.js";
import {displayCategories} from "./modulesJs/displayCategories.js";
import {closeModal} from "./modulesJs/closeModal.js";
import {submitForm} from "./modulesJs/submitForm.js";
import {updateLoginState} from "./modulesJs/updateLoginState.js";
const galerySection = document.querySelector(".gallery");
const galeryModale = document.querySelector("#gallery-modal");

filterContainer.classList.add("filter-nav");
galerySection.parentNode.insertBefore(filterContainer, galerySection);


const modal = document.getElementById("modal1");
const buttonModify = document.querySelector(".buttonModify");
const closeButton = document.querySelector(".js-close");
const linkLogin = document.getElementById("login");
 const editMode = document.getElementById("editionMode");


document.querySelector("#submitPhotoBtn").addEventListener("click", (event) => {
  event.preventDefault();
  submitForm();
});

closeButton.addEventListener("click", closeModal);

if (!sessionStorage.getItem("works")) {
  
  fetchWorks();
} else {
  const worksArray = JSON.parse(sessionStorage.getItem("works"));
  displayGallery(worksArray);
}

if (!sessionStorage.getItem("categories")) {
  fetchCategories();
} else {
  const categorieArray = JSON.parse(sessionStorage.getItem("categories"));
  displayCategories(categorieArray);
}

updateLoginState();
export{galerySection,filterContainer,linkLogin,buttonModify,editMode,modal,galeryModale};