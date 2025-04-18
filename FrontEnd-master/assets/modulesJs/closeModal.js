import{modal,galeryModale} from "../script.js";
import{resetSection} from "./resetSection.js";
export const closeModal = () => {
    const form = document.querySelector("#addPhotoForm");
    const addImageButton = document.querySelector("#add-image");
    form.style.display = "none";
    addImageButton.style.display = "block";
    modal.style.display = "none";
    resetSection(galeryModale);
  };