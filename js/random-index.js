  async function loadWorks() {
    try {
      const response = await fetch('./JSON/portfolio.json'); 

      if (!response.ok) {
        throw new Error('Error al obtener los trabajos');
      }
      const works = await response.json();  

    rotateRandomWorks(works, 4);
  
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }

 function rotateRandomWorks(works, count) {

   let randomWorks = getRandomWorks(works, count);
   renderWorks(randomWorks, 'portfolioContainerIndex');

   setInterval(() => {
     randomWorks = getRandomWorks(works, count);
     renderWorks(randomWorks, 'portfolioContainerIndex');
   }, 10000);
}   

  function renderWorks(works, containerId = 'portfolioContainerIndex') {
    let container = document.getElementById(containerId);
    let content = '';  

    if (!container) {
      console.error('Contenedor de trabajos no encontrado');
      return;
    }

    works.forEach(elemento => {

      const {
        img = './assets/img/default.jpg',
        item = 'Trabajo no disponible',
        type = 'Tipo no especificado',
        year = 'Año no disponible'
      } = elemento;
  
      content += `
        <a href="./pages/portfolio.html" target="blank">
        <div class="cajasPortfolio">
        <img alt="Imagen de ${item}" title="${item}" src="${img}">
          <div class="cajaDetallePortfolio">
            <h1>${item}</h1></a>               
            <p><b>${type}</b></p>
            <p>${year}</p>
          </div>
        </div>
        </a>
      `;
    });
    container.innerHTML = content;
  }
  
  function getRandomWorks(works, count) {
    const itemMix = works.sort(() => 0.5 - Math.random());
    return itemMix.slice(0, count);
  }

  loadWorks();