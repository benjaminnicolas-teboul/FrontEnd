const portfolioSection = document.getElementById("portfolio");
const galerySection = document.querySelector(".gallery");
const galeryModale = document.querySelector("#gallery-modal");
const filterContainer = document.createElement("nav");
filterContainer.classList.add("filter-nav");
galerySection.parentNode.insertBefore(filterContainer, galerySection);

const displayGallery = (data) => {
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

const fetchWorks = () => {
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

const fetchCategories = () => {
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
const eventButtons = () => {
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
const displayCategories = (data) => {
  const AllButtonHTML = `
        <button class="filter-btn active" data-category="all">
          tous
        </button>
      `;
  filterContainer.insertAdjacentHTML("beforeend", AllButtonHTML);
  data.forEach((item) => {
    buttonHTML = `
        <button class="filter-btn" data-category="${item.id}">
          ${item.name}
        </button>
      `;
    filterContainer.insertAdjacentHTML("beforeend", buttonHTML);
  });
  eventButtons();
};

function resetSection(section) {
  section.innerHTML = "";
}

const displayGalleryModale = (data) => {
  data.forEach((item) => {
    const figureHTML = `
      <figure data-id="${item.id}">
      <div class="image-container">
        <img src="${item.imageUrl}" alt="${item.title}">
        <i class="fa-regular fa-trash-can delete-icon"></i>
        </div>
      </figure>
    `;
    galeryModale.insertAdjacentHTML("beforeend", figureHTML);
  });
};

const modal = document.getElementById("modal1");
const buttonModify = document.querySelector(".buttonModify");
const closeButton = document.querySelector(".js-close");
const link = document.getElementById("login");
const editMode = document.getElementById("editionMode");
const openModal = (event) => {
  const worksArray = JSON.parse(sessionStorage.getItem("works"));
  console.log(worksArray);
  event.preventDefault();
  modal.style.display = "block";
  displayGalleryModale(worksArray);
};

const closeModal = () => {
  modal.style.display = "none";
  resetSection(galeryModale);
};

const updateLoginState = () => {
  if (sessionStorage.getItem("token")) {
    const addImage = document.getElementById("add-image");
    link.textContent = "Logout";
    link.href = "#";
    editMode.style.display = "block";
    buttonModify.addEventListener("click", openModal);
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    link.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.removeItem("token");
      updateLoginState();
    });

    addImage.addEventListener("click", (event) => {
      event.preventDefault();
      const formAddphotos = document.getElementById("addPhotoForm");
      const headModal = document.getElementById("modal-header");
      const categoryArray = JSON.parse(sessionStorage.getItem("categories"));
      const categoriesSelectElement = document.getElementById("photoCategory");

      categoryArray.forEach((item) => {
        console.log(item);
        var option = document.createElement("option");
        option.value = item.name;
        option.text = item.name;
        categoriesSelectElement.append(option);
      });

      formAddphotos.style.opacity = 1;
      addImage.style.opacity = 0;
      resetSection(galeryModale);
      headModal.style.opacity = 0;
    });
  } else {
    link.textContent = "Login";
    link.href = "login.html";
    buttonModify.style.display = "none";
    buttonModify.removeEventListener("click", openModal);
    closeModal();
    editMode.style.display = "none";
    resetSection(galeryModale);
  }
};

const deleteWork = async (id) => {
  const storedToken = sessionStorage.getItem("token");
  const parsedToken = JSON.parse(storedToken);
  const jwt = parsedToken.token;
  console.log(jwt);
  
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      document.querySelectorAll(`[data-id="${id}"]`).forEach(element => {
        element.remove();
    });
    resetSection(galeryModale);
    
    console.log(`Work avec l'ID ${id} supprimé avec succès.`);
    } else {
      console.error(
        `Erreur lors de la suppression : ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
};
deleteWork(9);
const icons = galeryModale.querySelectorAll("#gallery-modal .delete-icon ");

for (let icon of icons) {
  icon.addEventListener("click", (event) => {
    const figureElement = event.target.closest("figure");
    console.log(figureElement);

    const workId = figureElement.getAttribute("data-id");
    console.log(workId);
    deleteWork(workId);
  });
}

closeButton.addEventListener("click", closeModal);

if (!sessionStorage.getItem("works")) {
  fetchWorks();
} else {
  const worksArray = JSON.parse(sessionStorage.getItem("works"));
  displayGallery(worksArray);
}

if (!sessionStorage.getItem("categories")) {
  fetchCategories();
} else {
  const categorieArray = JSON.parse(sessionStorage.getItem("categories"));
  displayCategories(categorieArray);
}
updateLoginState();


/*
async function submitForm() {
  const formData = new FormData();
  const imageFile = document.querySelector('#photoInput').files[0]; // Récupérer le fichier image
  const categoryValue = document.querySelector('#photoCategory').value; // Récupérer la catégorie

  // Ajouter les données au FormData
  formData.append('image', imageFile); // Clé "image" avec le fichier
  formData.append('category', categoryValue); // Clé "category" avec la valeur du select

  try {
      const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si authentification requise
          },
          body: formData, // Pas besoin de spécifier "Content-Type" : le navigateur le fait automatiquement
      });

      if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse de l\'API :', data);
  } catch (error) {
      console.error('Échec de la requête :', error);
  }
}

// Ajouter un écouteur d'événement sur le formulaire ou un bouton pour exécuter cette fonction
document.querySelector('#submitPhotoBtn').addEventListener('click', (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  submitForm(); // Appelle la fonction async
});

*/
  
  