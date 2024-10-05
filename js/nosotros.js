function renderUs(integrantes){

fetch('../JSON/integrantes.json')
    .then( (res) => res.json())
    .then( (integrantes) => {

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

    })

   
}

renderUs(integrantes)

