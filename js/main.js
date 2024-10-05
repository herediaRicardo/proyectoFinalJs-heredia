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
    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];  
//Valores de los inputs del form registro
    const userName = document.getElementById('nameRegister').value;
    const userLastname = document.getElementById('lastNameRegister').value;
    const userMail = document.getElementById('emailRegister').value;
    const userPassword = document.getElementById('passwordRegister').value;
    const userPasswordConfirm = document.getElementById('passwordRegisterConfirm').value;

//Contenedores de donde van las advertencias
    let formIsValid = true;
    let containerName = document.getElementById("cajaRegisterName");
    let containerLastName = document.getElementById("cajaRegisterLastName");
    let containerMail = document.getElementById("cajaRegisterMail");
    let containerPassword = document.getElementById("cajaRegisterPassword");
    let containerPasswordConfirm = document.getElementById("cajaRegisterPasswordConfirm");

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

!userMail 
    ? (showWarning(containerMail, 'mailWarning', 'Ingrese un mail correcto'), formIsValid = false)
    : usuarioExistente 
        ? (showWarning(containerMail, 'mailWarning', 'Este correo ya está registrado'), formIsValid = false) 
        : removeWarning(containerMail, 'mailWarning');

        //Chequeo si ya existe el usuario
    const usuarioExistente = usuariosGuardados.find(usuario => usuario.email === userMail);
    if (!userMail) {
        showWarning(containerMail, 'mailWarning', 'Ingrese un mail correcto');
        formIsValid = false;
    } else if (usuarioExistente) {
        showWarning(containerMail, 'mailWarning', 'Este correo ya está registrado');
        formIsValid = false;
    } else {
        removeWarning(containerMail, 'mailWarning');
    }


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