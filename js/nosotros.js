function renderUs(integrantes){

    fetch('../JSON/integrantes.json')
    .then(res => {
        // Programación defensiva: verifica si la respuesta es exitosa
        if (!res.ok) {
            throw new Error("Error al obtener los datos.");
        }
        return res.json();
    })
    .then(integrantes => {
        let container = document.getElementById('integrantes');
        let content = '';

        integrantes.map(elemento => {
            // Desestructuración con valores por defecto (programación defensiva)
            const { 
                img = '../assets/img/default.webp', 
                nombre = 'Nombre no disponible', 
                perfil = 'Perfil no disponible', 
                descripcion = 'Descripción no disponible', 
                instagram = '#', 
                linkedin = '#' 
            } = elemento;

            // Construye el contenido asegurando que los valores estén definidos
            content += `
                <div class="cajasIntegrantes">
                    <div class="integrantesFotos">
                        <img src="${img}" alt="${nombre}">
                    </div>
                    <h4>${nombre}</h4>
                    <h6>${perfil}</h6>
                    <p>${descripcion}</p>
                    <div class="cajaRedes">
                        <a href="${instagram}" target="_blank"><img src="../assets/img/instagram.webp" alt="Instagram de ${nombre}"></a>
                        <a href="${linkedin}" target="_blank"><img src="../assets/img/linkedin.webp" alt="LinkedIn de ${nombre}"></a>
                    </div>
                </div>
            `;
        });

        // Verifica si el contenedor existe (programación defensiva)
        if (container) {
            container.innerHTML = content;
        } else {
            console.error('Contenedor no encontrado');
        }

    })
    .catch(error => {
        // Manejo de errores en caso de que la promesa falle
        console.error('Error al cargar los integrantes:', error);
    }); 
}

renderUs(integrantes)

