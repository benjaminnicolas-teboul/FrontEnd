import {previewImage,imageElements} from "../script.js";


 export const previewImg = () =>{
 const file = photoInput.files[0];
   if (file) {
     const validImageTypes = ["image/jpeg", "image/png"];
     if (!validImageTypes.includes(file.type)) {
       previewImage.src = ""; 
       alert("Veuillez sélectionner un fichier image valide (JPEG, PNG).");
       return;
     }
     const maxSizeInBytes = 4 * 1024 * 1024;
     if (file.size > maxSizeInBytes) {
       previewImage.src = "";
       alert("La taille du fichier ne doit pas dépasser 4 Mo.");
       return;
     }
     const reader = new FileReader();
     reader.onload = function (e) {
       previewImage.src = e.target.result;
     };
     reader.readAsDataURL(file);
     imageElements.style.display = "none";
     previewImage.style.display = "block";
   } else {
    previewImage.style.display = "none";
     previewImage.src = "";
   }
}