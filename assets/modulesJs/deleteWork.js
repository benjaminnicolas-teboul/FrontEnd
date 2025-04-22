import {fetchWorks} from "./fetchWorks.js";
import {closeModal} from "./closeModal.js";
export const deleteWork = async (id) => {
    const storedToken = sessionStorage.getItem("token");
    const parsedToken = JSON.parse(storedToken);
    const jwt = parsedToken.token;
    try {
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      if (response.ok) {
        document.querySelectorAll(`[data-id="${id}"]`).forEach((element) => {
          element.remove();
        });
        sessionStorage.removeItem("works");
        fetchWorks();
        let works = JSON.parse(sessionStorage.getItem("works")) || [];
        works = works.filter((work) => work.id !== id);
        closeModal();
      } else {
        console.error(
          `Erreur lors de la suppression : ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    }
  };