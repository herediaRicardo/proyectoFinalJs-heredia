function renderUs() {
    fetch('../JSON/integrantes.json')
        .then(res => {
            // Programación defensiva: verifico si la respuesta es exitosa
            if (!res.ok) {
                throw new Error("Error al obtener los datos.");
            }
            return res.json();
        })
        .then(members => {
            let container = document.getElementById('integrantes');
            let content = '';

            members.map(elemento => {
                // Desestructuración con valores por defecto (programación defensiva)
                const { 
                    img = '../assets/img/default.webp', 
                    name = 'Nombre no disponible', 
                    perfil = 'Perfil no disponible', 
                    description = 'Descripción no disponible', 
                    instagram = '#', 
                    linkedin = '#' 
                } = elemento;

                // Construyo el contenido asegurando que los valores estén definidos
                content += `
                    <div class="cajasIntegrantes">
                        <div class="integrantesFotos">
                            <img src="${img}" alt="${name}">
                        </div>
                        <h4>${name}</h4>
                        <h6>${perfil}</h6>
                        <p>${description}</p>
                        <div class="cajaRedes">
                            <a href="${instagram}" target="_blank"><img src="../assets/img/instagram.webp" alt="Instagram de ${name}"></a>
                            <a href="${linkedin}" target="_blank"><img src="../assets/img/linkedin.webp" alt="LinkedIn de ${name}"></a>
                        </div>
                    </div>
                `;
            });

            // Verifico si el contenedor existe (programación defensiva)
            if (container) {
                container.innerHTML = content;
            } else {
                console.error('Contenedor no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al cargar los integrantes:', error);
        }); 
}

renderUs();
