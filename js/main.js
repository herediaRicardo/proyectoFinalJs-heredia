const paginaActual = document.body.dataset.pagina || '';

// Función para mostrar advertencias
function showWarning(container, warningId, message) {
    let warning = document.getElementById(warningId);
    if (!warning) {
        warning = document.createElement('div');
        warning.id = warningId;
        warning.innerHTML = `<span>${message}</span>`;
        container.appendChild(warning);
    }
}
// Función para eliminar advertencias
function removeWarning(container, warningId) {
    let warning = document.getElementById(warningId);
    if (warning) {
        container.removeChild(warning);
    }
}

function configurarRegistro() {

document.getElementById('crearCuenta').addEventListener('click', (event) => {
    event.preventDefault();
    let usuariosGuardados;
    try {
        usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch (error) {
        console.error("Error al parsear usuarios de localStorage", error);
        usuariosGuardados = [];
    }
    //Valores de los inputs del form registro con desestructuracion
    const { value: userName } = document.getElementById('nameRegister');
    const { value: userLastname } = document.getElementById('lastNameRegister');
    const { value: userMail } = document.getElementById('emailRegister');
    const { value: userPassword } = document.getElementById('passwordRegister');
    const { value: userPasswordConfirm } = document.getElementById('passwordRegisterConfirm');

//Contenedores de donde van las advertencias con desestructuracion
    let formIsValid = true;
    const containerElements = {
        containerName: document.getElementById("cajaRegisterName"),
        containerLastName: document.getElementById("cajaRegisterLastName"),
        containerMail: document.getElementById("cajaRegisterMail"),
        containerPassword: document.getElementById("cajaRegisterPassword"),
        containerPasswordConfirm: document.getElementById("cajaRegisterPasswordConfirm")
    };

    const { containerName, containerLastName, containerMail, containerPassword, containerPasswordConfirm } = containerElements;

//Funcion para mostrar errores
    const showWarning = (container, warningId, mensaje) => {
        let warning = document.getElementById(warningId);
        if (!warning) {
            warning = document.createElement('div');
            warning.id = warningId;
            warning.innerHTML = `<span>${mensaje}</span>`;
            container.appendChild(warning);
        }
    };

//Funcion para eliminar advertencias ya creadas.
    const removeWarning = (container, warningId) => {
        let warning = document.getElementById(warningId);
        if (warning) {
            container.removeChild(warning);
        }
    };

//Validaciones
!userName 
    ? (showWarning(containerName, 'nameWarning', 'Ingrese un nombre correcto'), formIsValid = false) 
    : removeWarning(containerName, 'nameWarning');

!userLastname 
    ? (showWarning(containerLastName, 'lastNameWarning', 'Ingrese un apellido correcto'), formIsValid = false) 
    : removeWarning(containerLastName, 'lastNameWarning');

    //Chequeo si ya existe el usuario

    const usuarioExistente = usuariosGuardados.find(usuario => usuario.email === userMail);
    !userMail 
    ? (showWarning(containerMail, 'mailWarning', 'Ingrese un mail correcto'), formIsValid = false)
    : usuarioExistente 
        ? (showWarning(containerMail, 'mailWarning', 'Este correo ya está registrado'), formIsValid = false) 
        : removeWarning(containerMail, 'mailWarning');

    !userPassword 
    ? (showWarning(containerPassword, 'passwordWarning', 'Ingrese una contraseña correcta'), formIsValid = false) 
    : removeWarning(containerPassword, 'passwordWarning');

    userPassword !== userPasswordConfirm 
    ? (showWarning(containerPasswordConfirm, 'passwordWarningConfirm', 'La contraseña es diferente'), formIsValid = false)
    : removeWarning(containerPasswordConfirm, 'passwordWarningConfirm');


//Si formIsValid es true...
    if (formIsValid) {
        const hashedPassword = CryptoJS.SHA256(userPassword).toString();
        
        // Crear el nuevo usuario
        const nuevoUsuario = {
            nombre: userName,
            lastName: userLastname,
            email: userMail,
            password: hashedPassword
        };

        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        navegar(); 
    }
});
};


function configurarInicioSesion() {

    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];    
    document.getElementById('botonInicioSesion').addEventListener('click', (event) => {   
    event.preventDefault();

    const emailLogin = document.getElementById('email').value;
    const passwordLogin = document.getElementById('password').value;
    let loginContainer = document.getElementById('cajaLogin');
    let loginWarning = document.getElementById('loginWarning');


    if (loginWarning) {
        loginContainer.removeChild(loginWarning);
    }


    if (!emailLogin || !passwordLogin) {
        showWarning(loginContainer, 'loginWarning', 'Correo electrónico o contraseña incorrectos');
        return;
    }

    const usuarioEncontrado = usuariosGuardados.find(usuario => usuario.email === emailLogin);
    const hashedPasswordLogin = CryptoJS.SHA256(passwordLogin).toString();

    // Verificar si las credenciales coinciden
    if (!usuarioEncontrado || usuarioEncontrado.password !== hashedPasswordLogin) {
        showWarning(loginContainer, 'loginWarning', 'Correo electrónico o contraseña incorrectos');
    } else {
        navegar(); 
    }
});
};


function navegar(){  
    location.href = "../index.html";
    //crear logica para popup de bienvenida
};

// Ejecutar funciones según la página actual
document.addEventListener('DOMContentLoaded', () => {
    paginaActual === 'login' ? configurarInicioSesion() : configurarRegistro();
})