import {displayCategories} from "./displayCategories.js";

export const fetchCategories = () => {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("categories", JSON.stringify(data));
      displayCategories(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
      return [];
    });
};