let trabajos = [
    {trabajo: "Zapatos 3D", tipo: "3D", año: 2022, img: "../assets/img/portfolio/unoi.jpg" },
    {trabajo: "Mochila alpine", tipo: "fotografia", año: 2022, img: "../assets/img/portfolio/dos.png" },
    {trabajo: "Personaje 3D", tipo: "3D", año: 2023, img: "../assets/img/portfolio/tres.png" },
    {trabajo: "Videoclip Ke Personaje", tipo: "audiovisual", año: 2024, img: "../assets/img/portfolio/cuatro.png" },
    {trabajo: "Zombie 3D", tipo: "3D", año: 2023, img: "../assets/img/portfolio/cinco.png" },
    {trabajo: "Edición videoclip", tipo: "motion",año: 2023, img: "../assets/img/portfolio/seis.png" },
    {trabajo: "Tarjetería Marca", tipo: "branding", año: 2022, img: "../assets/img/portfolio/siete.png" },
    {trabajo: "Fotografía N° Channel", tipo: "fotografia", año: 2022, img: "../assets/img/portfolio/oho.png" },
    {trabajo: "Modelado 3D Minion", tipo: "3D", año: 2024, img: "../assets/img/portfolio/nueve.png" },
    {trabajo: "Patrones Diseño ", tipo: "branding", año: 2023, img: "../assets/img/portfolio/diez.png" },
    {trabajo: "Grabación película", tipo: "audiovisual", año: 2023, img: "../assets/img/portfolio/once.png" },
    {trabajo: "Folletería", tipo: "branding", año: 2023, img: "../assets/img/portfolio/doce.png" }
    ];

    let tresD = trabajos.filter(e => e.tipo === "3D");
    let motionGraphic = trabajos.filter(e => e.tipo === "motion");
    let web = trabajos.filter(e => e.tipo === "web");
    let fotografia = trabajos.filter(e => e.tipo === "fotografia");
    let audiovisual = trabajos.filter(e => e.tipo === "audiovisual");
    let branding = trabajos.filter(e => e.tipo === "branding");

 /*   
 //Sin refactorizar
    const todoClick = document.getElementById("todo");
    todoClick.onclick = () => {
      renderTrabajos(trabajos)
    }
    const tresDClick = document.getElementById("3D");
    tresDClick.onclick = () => {
      renderTrabajos(tresD)
    }
    const audiovisualClick = document.getElementById("audiovisual");
    audiovisualClick.onclick = () => {
      renderTrabajos(audiovisual)
    }
    const brandingClick = document.getElementById("branding");
    brandingClick.onclick = () => {
      renderTrabajos(branding)
    }
    const motionClick = document.getElementById("motion");
    motionClick.onclick = () => {
      renderTrabajos(motionGraphic)
    }
    const fotografiaClick = document.getElementById("fotografia");
    fotografiaClick.onclick = () => {
      renderTrabajos(fotografia)
    } 
      */


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

renderTrabajos(trabajos)


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
  //  document.body.appendChild(etiquetaSection);
}









