import {displayGalleryModale} from "./displayGalleryModale.js";
import {modal,galeryModale} from "../script.js";

export const openModal = (event) => {
  const worksArray = JSON.parse(sessionStorage.getItem("works"));
  event.preventDefault();
  modal.style.display = "block";
  displayGalleryModale(worksArray);
  galeryModale.style.display = "grid";
};