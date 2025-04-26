import{modal,galeryModale,previewImage,partialBorderGallery,returnGModal} from "../script.js";
import{resetSection} from "./resetSection.js";
import{updateButtonColor} from "./updateButtonColor.js";
import {modalTitle} from "../script.js"
export const closeModal = () => {
  const photoInput = document.querySelector("#photoInput");
    const titleInput = document.querySelector("#photoTitle");
    const form = document.querySelector("#addPhotoForm");
    const addImageButton = document.querySelector("#add-image");
    form.style.display = "none";
    addImageButton.style.display = "block";
    modal.style.display = "none";
    resetSection(galeryModale);
    modalTitle.innerHTML="Galerie photos";
    previewImage.src = "";
    previewImage.dataset.originalSrc = imagePreview.getAttribute('src');
    previewImage.style.display = "none";
    partialBorderGallery.style.display = "block";
    returnGModal.style.display = "none";
    photoInput.value="";
    titleInput.value="";
    document.querySelector("#photoCategory").value = "";
    updateButtonColor();
  };