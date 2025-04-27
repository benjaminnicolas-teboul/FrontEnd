
import {displayGalleryModale} from "./displayGalleryModale.js"
import {modalTitle,galeryModale,returnGModal,formAddphotos,addImage,previewImage,partialBorderGallery} from "../script.js"

export const returnGalleryModal = () =>{
    const photoInput = document.querySelector("#photoInput");
    const titleInput = document.querySelector("#photoTitle");
    const worksArray = JSON.parse(sessionStorage.getItem("works"));
    returnGModal.style.display = "none";
    modalTitle.innerHTML="Galerie photos";
    displayGalleryModale(worksArray);
    galeryModale.style.display = "grid";
    formAddphotos.style.display = "none";
    addImage.style.display = "block";
    previewImage.src = "";
    previewImage.dataset.originalSrc = imagePreview.getAttribute('src');
    previewImage.style.display = "none";
    partialBorderGallery.style.display = "block";
    photoInput.value="";
    titleInput.value="";
    document.querySelector("#photoCategory").value = "";
   
}