
// Función para cargar los trabajos desde un archivo JSON
async function loadTrabajos() {
  try {
    const response = await fetch('../JSON/portfolio.json'); // Ruta al archivo JSON
    const trabajos = await response.json();
    
    // Filtrar los trabajos por tipo
    let tresD = trabajos.filter(e => e.tipo === "3D");
    let motionGraphic = trabajos.filter(e => e.tipo === "motion");
    let fotografia = trabajos.filter(e => e.tipo === "fotografia");
    let audiovisual = trabajos.filter(e => e.tipo === "audiovisual");
    let branding = trabajos.filter(e => e.tipo === "branding");

    const categories = {
      todo: trabajos,
      "3D": tresD,
      audiovisual: audiovisual,
      branding: branding,
      motion: motionGraphic,
      fotografia: fotografia
    };

    // Renderizar los trabajos
    renderTrabajos(trabajos);

    // Asignar eventos a los botones
    const buttons = Object.keys(categories);
    buttons.forEach(buttonId => {
      const element = document.getElementById(buttonId);
      element.onclick = () => {
        renderTrabajos(categories[buttonId]);
      };
    });

  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}

// Función para renderizar los trabajos en el HTML
function renderTrabajos(trabajos) {
  let container = document.getElementById('portfolioContainer');
  let content = '';
  trabajos.forEach(elemento => {
    content += `
      <div class="cajasPortfolio">
        <img alt="" title="" src=${elemento.img}>
        <div class="cajaDetallePortfolio">
          <h1>${elemento.trabajo}</h1>               
          <p><b>${elemento.tipo}</b></p>
          <p>${elemento.año}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = content;
}



// Cargar los trabajos al iniciar
loadTrabajos();



/* 
HAY QUE LOGRAR HACERLO FUNCIONAR
//También tengo un Constructor de nuevo Objeto de Trabajos, pero al no poder agregarlo por no tener servidor, no lo puedo hacer :(

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
