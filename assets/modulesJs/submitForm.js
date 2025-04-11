export 
async function submitForm() {
  
  const formData = new FormData();
  const previewImage = document.querySelector("#imagePreview");
  const categoryValue = document.querySelector("#photoCategory").value;
  const photoInput = document.querySelector("#photoInput");
  const titleInput = document.querySelector("#photoTitle");

  if (!titleInput || !photoInput || !categoryValue) {
    alert("Veuillez remplir tout les champs du formulaire.");
    return;
  }

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
        console.log(previewImage.src);
        
    };
    
    
    reader.onerror = () => {
      alert("Erreur lors du chargement de l'image.");
      console.error("Erreur FileReader :", reader.error);
    };
    reader.readAsDataURL(imageFile); 
    
    const src = previewImage.getAttribute('src');
    console.log(src);
    
  

  
  formData.append("id", "0");
  formData.append("imageUrl", imageFile);
  formData.append("title", titleValue);
  formData.append("categoryId", categoryValue);
  formData.append("userId", "0");



  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log("Réponse de l'API :", data);
    alert("Image envoyée avec succès !");
    photoInput.value = "";
    titleInput.value = "";
    categorySelect.value = "";
  } catch (error) {
    console.error("Échec de la requête :", error);
  }
}