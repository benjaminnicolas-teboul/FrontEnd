import { deleteWork } from "./deleteWork.js";
import { galeryModale } from "../script.js";

export const displayGalleryModale = (data) => {
  data.forEach((item) => {
    const figureHTML = `
      <figure data-id="${item.id}">
      <div class="image-container">
        <img src="${item.imageUrl}" alt="${item.title}">
        <i class="fa-regular fa-trash-can delete-icon"></i>
        </div>
      </figure>
    `;
    galeryModale.insertAdjacentHTML("beforeend", figureHTML);
  });
  const icons = galeryModale.querySelectorAll("figure");
  for (let icon of icons) {
    icon.addEventListener("click", (event) => {
      const figureElement = event.target.closest("figure");

      const workId = figureElement.dataset.id;

      deleteWork(workId);
    });
  }
};
