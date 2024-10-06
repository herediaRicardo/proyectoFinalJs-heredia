  async function loadTrabajos() {
    try {
      const response = await fetch('./JSON/portfolio.json'); // Ruta al archivo JSON
      // Programación defensiva: verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener los trabajos');
      }
      const trabajos = await response.json();
  
      // Mostrar trabajos aleatorios en el index.html
      const randomWorks = getRandomTrabajos(trabajos, 4);

      renderTrabajos(randomWorks, 'portfolioContainer'); // Renderiza en el contenedor del index.html
  
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
  
  // Función para renderizar los trabajos en el HTML
  function renderTrabajos(trabajos, containerId = 'portfolioContainer') {
    let container = document.getElementById(containerId);
    let content = '';
  
    // Programación defensiva: verifica si el contenedor existe
    if (!container) {
      console.error('Contenedor de trabajos no encontrado');
      return;
    }

    trabajos.forEach(elemento => {
      // Desestructuración con valores por defecto (programación defensiva)
      const {
        img = './assets/img/default.jpg',
        trabajo = 'Trabajo no disponible',
        tipo = 'Tipo no especificado',
        año = 'Año no disponible'
      } = elemento;
  
      // Crear el contenido HTML asegurando que los valores están definidos
      content += `
        <div class="cajasPortfolio">
          <img alt="Imagen de ${trabajo}" title="${trabajo}" src="${img}">
          <div class="cajaDetallePortfolio">
            <h1>${trabajo}</h1>               
            <p><b>${tipo}</b></p>
            <p>${año}</p>
          </div>
        </div>
      `;
    });
    container.innerHTML = content;
  }
  
  // Función para obtener trabajos al azar
  function getRandomTrabajos(trabajos, count) {
    const shuffled = trabajos.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Cargar los trabajos al iniciar
  loadTrabajos();