const integrantes = [
    {nombre: "Ricardo Heredia",
    perfil: "Diseñador 3D y Programador Web", 
    descripcion:"Excelente habilidad para fusionar diseño y funcionabilidad. Su dedicación y ética de trabajo sonejemplares, lo que le permite afrontar cada proyecto con un enfoque meticuloso y un profundo amor por eldetalle. Seriedad y compromiso, siempre dispuesto a apoyar a sus compañeros y a mantener al equipo alineado y en marcha hacia los objetivos comunes.",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    img: "../assets/img/nosotros/ricky.webp"
    },
    {nombre: "Nicolas Gentile",
    perfil: "Experto en VFX y Motion Graphics", 
    descripcion:"Es el genio detrás de los efectos visuales impresionantes y las animaciones dinámicas. Su creatividad es inagotable, y su capacidad para transformar ideas en movimiento es asombrosa. Siempre eficiente, Nicolás maneja la complejidad de los proyectos con una facilidad que deja a todos asombrados, entregando resultados visuales que cautivan.",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    img: "../assets/img/nosotros/nico.webp"
    },
    {nombre: "Matías Frare",
    perfil: "Diseñador 3D y experto en VFX", 
    descripcion:"Su aporte es una mezcla de habilidad técnica y simplicidad en su enfoque, lo que lo convierte en un maestro en la creación de arte 3D y efectos visuales. Su manejo preciso de las herramientas y su capacidad para simplificar procesos complejos permiten que cada proyecto fluya sin contratiempos, siempre con un toque de elegancia y profesionalismo.",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    img: "../assets/img/nosotros/mati.webp"
    },
    {nombre: "Renzo Paolino",
    perfil: "Diseñador 3D", 
    descripcion:"El perfeccionista del equipo, conocido por su atención al detalle y su compromiso con la excelencia. Su espíritu libre se refleja en su trabajo, donde cada modelo 3D es una obra maestra. Renzo no se conforma con lo ordinario; busca siempre superar los límites y entregar resultados que destacan por su precisión y calidad estética.",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    img: "../assets/img/nosotros/renzo.webp"
    }
];


function renderUs(integrantes){
    let container = document.getElementById('integrantes');
    let content = '';
    integrantes.map(elemento => {
        content += `
            <div class="cajasIntegrantes">
               <div class="integrantesFotos">
                <img src="${elemento.img}" alt="Ricardo Heredia - Diseñador Multimedial">
               </div>
               <h4>${elemento.nombre}</h4>
               <h6>${elemento.perfil}</h6>
               <p>${elemento.descripcion}</p>
               <div class="cajaRedes">
                    <a href="${elemento.instagram}" target="blank"><img src="../assets/img/instagram.webp" alt="Instagram integrantes"></a>
                    <a href="${elemento.linkedin}" target="blank"><img src="../assets/img/linkedin.webp" alt="Likedin integrante"></a>
               </div>
            </div>
               `;
    });
    container.innerHTML = content;
}

renderUs(integrantes)
