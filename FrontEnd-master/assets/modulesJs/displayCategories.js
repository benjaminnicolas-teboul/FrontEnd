import { filterContainer } from "../script.js";
import {eventButtons} from "./eventButtons.js";


export const displayCategories = (data) => {
    const AllButtonHTML = `
          <button class="filter-btn active" data-category="all">
            tous
          </button>
        `;
    filterContainer.insertAdjacentHTML("beforeend", AllButtonHTML);
    data.forEach((item) => {
      const buttonHTML = `
          <button class="filter-btn" data-category="${item.id}">
            ${item.name}
          </button>
        `;
      filterContainer.insertAdjacentHTML("beforeend", buttonHTML);
    });
    eventButtons();
  };