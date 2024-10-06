  async function loadWorks() {
    try {
      const response = await fetch('./JSON/portfolio.json'); // Ruta al archivo JSON
      // Programación defensiva: verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener los trabajos');
      }
      const works = await response.json();
  
      // Mostrar trabajos aleatorios en el index.html
      const randomWorks = getRandomWorks(works, 4);

      renderWorks(randomWorks, 'portfolioContainerIndex'); // Renderiza en el contenedor del index.html
  
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
  
  // Función para renderizar los trabajos en el HTML
  function renderWorks(works, containerId = 'portfolioContainerIndex') {
    let container = document.getElementById(containerId);
    let content = '';
  
    // Programación defensiva: verifica si el contenedor existe
    if (!container) {
      console.error('Contenedor de trabajos no encontrado');
      return;
    }

    works.forEach(elemento => {
      // Desestructuración con valores por defecto (programación defensiva)
      const {
        img = './assets/img/default.jpg',
        item = 'Trabajo no disponible',
        type = 'Tipo no especificado',
        year = 'Año no disponible'
      } = elemento;
  
      // Crear el contenido HTML asegurando que los valores están definidos
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
  
  // Función para obtener trabajos al azar
  function getRandomWorks(works, count) {
    const itemMix = works.sort(() => 0.5 - Math.random());
    return itemMix.slice(0, count);
  }
  
  // Cargar los trabajos al iniciar
  loadWorks();