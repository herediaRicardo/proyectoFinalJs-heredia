// Función para cargar los trabajos desde un archivo JSON
async function loadWorks() {
  try {
    const response = await fetch('../JSON/portfolio.json'); // Ruta al archivo JSON
    // Programación defensiva: verifico si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Error al obtener los trabajos');
    }
    const works = await response.json();

        // Filtrar los trabajos por tipo
        const categories = {
          todo: works,
          "3D": works.filter(e => e.type === "3D"),
          audiovisual: works.filter(e => e.type === "audiovisual"),
          branding: works.filter(e => e.type === "branding"),
          motion: works.filter(e => e.type === "motion"),
          fotografia: works.filter(e => e.type === "fotografia")
        };

    // Renderizo los trabajos
    renderWorks(works);

    // Asignar eventos a los botones
    const buttons = Object.keys(categories);
    buttons.forEach(buttonId => {
      const element = document.getElementById(buttonId);
      element.onclick = () => {
        renderWorks(categories[buttonId]);
      };
    });

  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}

// Función para renderizar los trabajos en el HTML
function renderWorks(works) {
  let container = document.getElementById('portfolioContainer');
  let content = '';

    // Programación defensiva: verifico si el contenedor existe
    if (!container) {
      console.error('Contenedor de trabajos no encontrado');
      return;
    }
    
    works.forEach(elemento => {
      // Desestructuración con valores por defecto (programación defensiva)
      const {
        img = './assets/img/default.webp',
        item = 'Trabajo no disponible',
        type = 'Tipo no especificado',
        year = 'Año no disponible'
      } = elemento;
  
      // Creo el contenido HTML asegurando que los valores están definidos
      content += `
        <div class="cajasPortfolio">
          <img alt="Imagen de ${item}" title="${item}" src=".${img}">
          <div class="cajaDetallePortfolio">
            <h1>${item}</h1>               
            <p><b>${type}</b></p>
            <p>${year}</p>
          </div>
        </div>
      `;
    });
    container.innerHTML = content;
  }


// Cargar los trabajos al iniciar
loadWorks();
