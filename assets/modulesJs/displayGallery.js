import {resetSection} from "./resetSection.js";
import {galerySection} from "../script.js";

export const displayGallery = (data) => {
    resetSection(galerySection);
    data.forEach((item) => {
      const figureHTML = `
        <figure data-id="${item.id}">
          <img src="${item.imageUrl}" alt="${item.title}">
          <figcaption>${item.title}</figcaption>
        </figure>
      `;
      galerySection.insertAdjacentHTML("beforeend", figureHTML);
    });
  };

  