// Función para cargar los trabajos desde un archivo JSON
async function loadWorks() {
  try {
    const response = await fetch('../JSON/portfolio.json'); // Ruta al archivo JSON
    // Programación defensiva: verifica si la respuesta es exitosa
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

    // Renderizar los trabajos
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

    // Programación defensiva: verifica si el contenedor existe
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
loadWorks();



/* 
//También tengo un Constructor de nuevo Objeto de Trabajos, pero al no poder agregarlo por no tener servidor, no puedo lograr agregar estas mismas.
HAY QUE LOGRAR HACERLO FUNCIONAR

class nuevoTrabajo{
  constructor(trabajo, tipo, año, img){
    this.trabajo = trabajo;
    this.tipo = tipo;
    this.año = año;
    this.img = img;
  }
}
async function addNewWorkToJson(nuevo){  
  try {
    const response = await fetch('http://localhost:3000/portfolio.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoTrabajo)
    });
    const result = await response.json();
    console.log(result.message); // Mensaje del servidor
  } catch (error) {
    console.error('Error al agregar el trabajo:', error);
  }
}

const newWork = new nuevoTrabajo("Foto Camara Sonic", "fotografia", 2024, "../assets/img/portfolio/photoCamera.webp");
const newWork2 = new nuevoTrabajo("Animacion Infografia", "motion", 2024, "../assets/img/portfolio/motionG1.webp");
const newWork3 = new nuevoTrabajo("Anteojos RayBan", "3D", 2023, "../assets/img/portfolio/photoGlass.webp");
const newWork4 = new nuevoTrabajo("Crema Facial", "3D", 2023, "../assets/img/portfolio/productCrema.webp");
const newWork5 = new nuevoTrabajo("Museo de los Artistas", "branding", 2023, "../assets/img/portfolio/folleteriaCards.webp");
const newWork6 = new nuevoTrabajo("Folleteria Franquicias", "branding", 2023, "../assets/img/portfolio/printOffset.webp");

addNewWorkToJson(newWork);
addNewWorkToJson(newWork2);
addNewWorkToJson(newWork3);
addNewWorkToJson(newWork4);
addNewWorkToJson(newWork5);
addNewWorkToJson(newWork6);
*/
