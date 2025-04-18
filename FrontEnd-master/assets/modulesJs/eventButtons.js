
import { filterContainer,galerySection} from "../script.js";
import { resetSection } from "./resetSection.js";
import { displayGallery } from "./displayGallery.js";
export const eventButtons = () => {
    const worksArray = JSON.parse(sessionStorage.getItem("works"));
    const buttonsFilter = filterContainer.querySelectorAll("button");
  
    for (let button of buttonsFilter) {
      button.addEventListener("click", (event) => {
        buttonsFilter.forEach((otherButton) => {
          otherButton.classList.remove("active");
        });
        button.classList.add("active");
        resetSection(galerySection);
        const idButton = Number(event.target.dataset.category);
        if (!Number(idButton)) {
          displayGallery(worksArray);
        } else {
          worksArray.forEach((work) => {
            const workCategory = work.categoryId;
            if (workCategory === idButton) {
              const figureHTML = `
                <figure data-id="${work.id}" >
                  <img src="${work.imageUrl}" alt="${work.title}">
                  <figcaption>${work.title}</figcaption>
                </figure>
              `;
              galerySection.insertAdjacentHTML("beforeend", figureHTML);
            }
          });
        }
      });
    }
  };