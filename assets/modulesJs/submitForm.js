import {closeModal} from "./closeModal.js";
import {fetchWorks} from "./fetchWorks.js";

export async function submitForm() {
 
    const formData = new FormData();
    const photoInput = document.querySelector("#photoInput");
    const titleInput = document.querySelector("#photoTitle");
    const categoryValue = document.querySelector("#photoCategory").value;
    const imageFile = photoInput.files[0];
  const titleValue = titleInput.value;
  const previewImage = document.querySelector("#imagePreview");
    if (!imageFile) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    if (!titleValue) {
      alert("Veuillez entrer un titre.");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(imageFile.type)) {
      alert("Veuillez sélectionner un fichier image valide (JPEG, PNG).");
      return;
    }
  
    const maxSizeInBytes = 4 * 1024 * 1024;
    if (imageFile.size > maxSizeInBytes) {
      console.error("Fichier trop volumineux.");
      alert("La taille du fichier ne doit pas dépasser 4 Mo.");
      return;
    }
  
      const reader = new FileReader();
      reader.onload = (event) => { 
          previewImage.src = event.target.result;
      };
      
      
      reader.onerror = () => {
        alert("Erreur lors du chargement de l'image.");
        console.error("Erreur FileReader :", reader.error);
      };
      reader.readAsDataURL(imageFile); 
    
    if (!imageFile || !titleValue) {
      alert("Veuillez sélectionner une image et entrer un titre.");
      return;
    }
  
   
   console.log(typeof(Number(categoryValue)));
   
    formData.append("image", imageFile); 
    formData.append("title", titleValue); 
    formData.append("category", Number(categoryValue));
 

 for (let pair of formData.entries()) {
  console.log(pair[0]+ ': ' + pair[1]);
}
 
 
    try {
      let token = sessionStorage.getItem("token");
      token = JSON.parse(token);
      token = token.token;
      console.log(token);
      
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
      
      
      photoInput.value = "";
      titleInput.value = "";
      document.querySelector("#photoCategory").value = "";
      closeModal();
      fetchWorks();
      
    } catch (error) {
      console.error("Échec de la requête :", error);
      alert(`Erreur : ${error.message}`);
    }
      
  }
  
 