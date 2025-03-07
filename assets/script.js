const portfolioSection = document.getElementById('portfolio');
const galerySection = document.querySelector('.gallery');
const filterContainer = document.createElement('nav');
filterContainer.classList.add('filter-nav');

const createFigure = (item) => {
  const figureHTML = `
    <figure data-id=${item.categoryId}>
      <img src="${item.imageUrl}" alt="${item.title}">
      <figcaption>${item.title}</figcaption>
    </figure>
  `;
  galerySection.insertAdjacentHTML('beforeend', figureHTML);
};

const populateGallery = (data) => {   
    data.forEach(item => {
      createFigure(item);
    });
  };
  

  const fetchWorks = () => {
    return fetch('http://localhost:5678/api/works')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau : ' + response.status);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        return [];
      });
  };
  
  const createFilterButtons = (works) => {
    const categories = [
        { id: 'all', name: 'Tous' },
        ...new Set(works.map(work => work.category))
    ];

    const uniqueCategories = categories.filter((category, index) => {
        return index === categories.findIndex(c => c.name === category.name);
    });

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.classList.add('filter-btn', 'active');
    filterContainer.appendChild(allButton);

    uniqueCategories.forEach(category => {
        if (category.id !== 'all') {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('filter-btn');
            button.dataset.category = category.id;
            filterContainer.appendChild(button);
        }
    });

    portfolioSection.insertBefore(filterContainer, galerySection);
};
  
  const initGallery = () => {
    fetchWorks()
      .then(works => {
        populateGallery(works);
      });
  };
  
  initGallery();

 