import {closeModal} from "./closeModal.js";
import {fetchWorks} from "./fetchWorks.js";
import{} from "../script.js";

export async function submitForm() {
   const formData = new FormData();
    const photoInput = document.querySelector("#photoInput");
    const titleInput = document.querySelector("#photoTitle");
    const categoryValue = document.querySelector("#photoCategory").value;
    const imageFile = photoInput.files[0];
  const titleValue = titleInput.value;

    if (!imageFile) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    if (!titleValue) {
      alert("Veuillez entrer un titre.");
      return;
    }
    if (!imageFile || !titleValue) {
      alert("Veuillez sélectionner une image et entrer un titre.");
      return;
    }
    
    formData.append("image", imageFile); 
    formData.append("title", titleValue); 
    formData.append("category", Number(categoryValue));
    try {
      let token = sessionStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
   
      
      if (!token) {
        throw new Error("Token manquant. Veuillez vous reconnecter.");
      }
  
  
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Réponse API :", data);
      alert("Work ajouté avec succès !");
      photoInput.value="";
      titleInput.value="";
      document.querySelector("#photoCategory").value = "";
      closeModal();
      fetchWorks();
      const button = document.getElementById("submitPhotoBtn");
      button.style.backgroundColor = "#a0a0a0";
    } catch (error) {
      console.error("Échec de la requête :", error);
      alert(`Erreur : ${error.message}`);
    }
      
  }
  
 