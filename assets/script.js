
const filterContainer = document.createElement("nav");
import {fetchWorks} from "./modulesJs/fetchWorks.js";
import {displayGallery} from "./modulesJs/displayGallery.js";
import {fetchCategories} from "./modulesJs/fetchCategories.js";
import {displayCategories} from "./modulesJs/displayCategories.js";
import {closeModal} from "./modulesJs/closeModal.js";
import {submitForm} from "./modulesJs/submitForm.js";
import {updateLoginState} from "./modulesJs/updateLoginState.js";
import {previewImg} from "./modulesJs/previewImg.js";
const galerySection = document.querySelector(".gallery");
const galeryModale = document.querySelector("#gallery-modal");
const modalTitle= document.querySelector("#modalTitle");
const returnGModal = document.getElementById("returnGalleryModale");




const modal = document.getElementById("modal1");
const buttonModify = document.querySelector(".buttonModify");
const closeButton = document.querySelector(".js-close");
const linkLogin = document.getElementById("login");
 const editMode = document.getElementById("editionMode");
 const photoInput = document.querySelector("#photoInput");
const previewImage = document.querySelector("#imagePreview");
const formAddphotos = document.getElementById("addPhotoForm");
const addImage = document.getElementById("add-image");
const imageElements = document.getElementById('imageElements');
const partialBorderGallery = document.getElementById('bordure-partielle-gallery');

    
filterContainer.classList.add("filter-nav");
galerySection.parentNode.insertBefore(filterContainer, galerySection);

 photoInput.addEventListener("change", function () {
  previewImg();
 });

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
export{galerySection,filterContainer,linkLogin,buttonModify,editMode,modal,galeryModale,previewImage,modalTitle,returnGModal,formAddphotos,addImage,imageElements,partialBorderGallery};