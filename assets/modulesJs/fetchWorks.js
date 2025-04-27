import {displayGallery} from "./displayGallery.js";

export const fetchWorks = async () => {
    return fetch("http://localhost:5678/api/works")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("works", JSON.stringify(data));
        displayGallery(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
      });
  };

