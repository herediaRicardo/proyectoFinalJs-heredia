// Función para cargar los trabajos desde un archivo JSON
async function  loadMerch() {
    try {
      const response = await fetch('../JSON/merch.json'); // Ruta al archivo JSON
      // Programación defensiva: verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener los trabajos');
      }
      const merch = await response.json();
    
      // Renderizar los trabajos
      renderMerch(merch);
  
  
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
  
  // Función para renderizar los trabajos en el HTML
  function renderMerch(merch) {
    let container = document.getElementById('portfolioContainer');
    let content = '';
  
      // Programación defensiva: verifica si el contenedor existe
      if (!container) {
        console.error('Contenedor de trabajos no encontrado');
        return;
      }
      
      merch.forEach(elemento => {
        // Desestructuración con valores por defecto (programación defensiva)
        const {
          img = './assets/img/default.webp',
          item = 'Trabajo no disponible',
          type = 'Tipo no especificado',
          year = 'Año no disponible'
        } = elemento;
    
        // Crear el contenido HTML asegurando que los valores están definidos
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
  loadMerch();
  
  