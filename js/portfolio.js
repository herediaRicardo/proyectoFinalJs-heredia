let trabajos = [
    {trabajo: "Zapatos 3D", tipo: "3D", año: 2022, img: "../assets/img/portfolio/unoi.jpg" },
    {trabajo: "Mochila alpine", tipo: "fotografia", año: 2022, img: "../assets/img/portfolio/dos.png" },
    {trabajo: "Personaje 3D", tipo: "3D", año: 2023, img: "../assets/img/portfolio/tres.png" },
    {trabajo: "Videoclip Ke Personaje", tipo: "audiovisual", año: 2024, img: "../assets/img/portfolio/cuatro.png" },
    {trabajo: "Zombie 3D", tipo: "3D", año: 2023, img: "../assets/img/portfolio/cinco.png" },
    {trabajo: "Edición videoclip", tipo: "motion",año: 2023, img: "../assets/img/portfolio/seis.png" },
    {trabajo: "Tarjetería Marca", tipo: "branding", año: 2022, img: "../assets/img/portfolio/siete.png" },
    {trabajo: "Fotografía Channel", tipo: "fotografia", año: 2022, img: "../assets/img/portfolio/oho.png" },
    {trabajo: "Modelado 3D Minion", tipo: "3D", año: 2024, img: "../assets/img/portfolio/nueve.png" },
    {trabajo: "Patrones Diseño ", tipo: "branding", año: 2023, img: "../assets/img/portfolio/diez.png" },
    {trabajo: "Grabación película", tipo: "audiovisual", año: 2023, img: "../assets/img/portfolio/once.png" },
    {trabajo: "Folletería", tipo: "branding", año: 2023, img: "../assets/img/portfolio/doce.png" },
    {trabajo: "Cartoon", tipo: "motion", año: 2022, img: "../assets/img/portfolio/animateCartoon.webp" },
    {trabajo: "Infografía Greenpeace", tipo: "motion", año: 2022, img: "../assets/img/portfolio/motionGCuatro.webp" },
    {trabajo: "Psy Trance", tipo: "audiovisual", año: 2022, img: "../assets/img/portfolio/audisvisualDos.webp" }
    ];

    let tresD = trabajos.filter(e => e.tipo === "3D");
    let motionGraphic = trabajos.filter(e => e.tipo === "motion");
    let web = trabajos.filter(e => e.tipo === "web");
    let fotografia = trabajos.filter(e => e.tipo === "fotografia");
    let audiovisual = trabajos.filter(e => e.tipo === "audiovisual");
    let branding = trabajos.filter(e => e.tipo === "branding");

    //refactorizado
    const categories = {
      todo: trabajos,
      "3D": tresD,
      audiovisual: audiovisual,
      branding: branding,
      motion: motionGraphic,
      fotografia: fotografia
    };
    
    const buttons = Object.keys(categories);
    
    buttons.forEach(buttonId => {
      const element = document.getElementById(buttonId);
      element.onclick = () => {
        renderTrabajos(categories[buttonId]);
      };
    });

function renderTrabajos(trabajos){
    let container = document.getElementById('portfolioContainer');
    let content = '';
    //let etiquetaSection = document.createElement('section');
    trabajos.map(elemento => {
        let etiquetaDiv = document.createElement('div');
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
    document.body.appendChild(etiquetaDiv);
               //Contatene en la variable content.
    });
    container.innerHTML = content;
}

//Constructor de nuevo Objeto de Trabajos
class nuevoTrabajo{
  constructor(trabajo, tipo, año, img){
    this.trabajo = trabajo;
    this.tipo = tipo;
    this.año = año;
    this.img = img;
  }
}
function showNewWork(nuevo){  
  trabajos.push(nuevo);  

  if (categories[nuevo.tipo]) {
    categories[nuevo.tipo].unshift(nuevo);
  }
}

const newWork = new nuevoTrabajo("Foto Camara Sonic", "fotografia", 2024, "../assets/img/portfolio/photoCamera.webp");
const newWork2 = new nuevoTrabajo("Animacion Infografia", "motion", 2024, "../assets/img/portfolio/motionG1.webp");
const newWork3 = new nuevoTrabajo("Anteojos RayBan", "3D", 2023, "../assets/img/portfolio/photoGlass.webp");
const newWork4 = new nuevoTrabajo("Crema Facial", "3D", 2023, "../assets/img/portfolio/productCrema.webp");
const newWork5 = new nuevoTrabajo("Museo de los Artistas", "branding", 2023, "../assets/img/portfolio/folleteriaCards.webp");
const newWork6 = new nuevoTrabajo("Folleteria Franquicias", "branding", 2023, "../assets/img/portfolio/printOffset.webp");

showNewWork(newWork);
showNewWork(newWork2);
showNewWork(newWork3);
showNewWork(newWork4);
showNewWork(newWork5);
showNewWork(newWork6);

renderTrabajos(trabajos);





