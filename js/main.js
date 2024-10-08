const currentPage = document.body.dataset.pagina || '';


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

function configureRegister() {
    document.getElementById('crearCuenta').addEventListener('click', (event) => {
        event.preventDefault();
        let savedUsers;
        try {
            savedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
        } catch (error) {
            console.error("Error al parsear usuarios de localStorage", error);
            savedUsers = [];
        }

        // Valores de los inputs del form registro con desestructuración
        const { value: userName } = document.getElementById('nameRegister');
        const { value: userLastname } = document.getElementById('lastNameRegister');
        const { value: userMail } = document.getElementById('emailRegister');
        const { value: userPassword } = document.getElementById('passwordRegister');
        const { value: userPasswordConfirm } = document.getElementById('passwordRegisterConfirm');

        // Contenedores de donde van las advertencias con desestructuración
        let formIsValid = true;
        const containerElements = {
            containerName: document.getElementById("cajaRegisterName"),
            containerLastName: document.getElementById("cajaRegisterLastName"),
            containerMail: document.getElementById("cajaRegisterMail"),
            containerPassword: document.getElementById("cajaRegisterPassword"),
            containerPasswordConfirm: document.getElementById("cajaRegisterPasswordConfirm")
        };

        const { containerName, containerLastName, containerMail, containerPassword, containerPasswordConfirm } = containerElements;

        // Validaciones
        !userName 
            ? (showWarning(containerName, 'nameWarning', 'Ingrese un nombre correcto'), formIsValid = false) 
            : removeWarning(containerName, 'nameWarning');

        !userLastname 
            ? (showWarning(containerLastName, 'lastNameWarning', 'Ingrese un apellido correcto'), formIsValid = false) 
            : removeWarning(containerLastName, 'lastNameWarning');

        // Chequeo si ya existe el usuario
        const existingUser = savedUsers.find(usuario => usuario.email === userMail);
        //El mail tiene que ser valido
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        !userMail 
            ? (showWarning(containerMail, 'mailWarning', 'Ingrese un mail valido'), formIsValid = false)
            : existingUser 
                ? (showWarning(containerMail, 'mailWarning', 'Este correo ya está registrado'), formIsValid = false) 
                : removeWarning(containerMail, 'mailWarning');
                   !emailPattern.test(userMail)
                   ? (showWarning(containerMail, 'mailWarning', 'Ingrese un mail válido'), formIsValid = false)
                   : removeWarning(containerMail, 'mailWarning');

        !userPassword 
            ? (showWarning(containerPassword, 'passwordWarning', 'Ingrese una contraseña correcta'), formIsValid = false) 
            : removeWarning(containerPassword, 'passwordWarning');

        userPassword !== userPasswordConfirm 
            ? (showWarning(containerPasswordConfirm, 'passwordWarningConfirm', 'La contraseña es diferente'), formIsValid = false)
            : removeWarning(containerPasswordConfirm, 'passwordWarningConfirm');

        // Si formIsValid es true...
        if (formIsValid) {
            const hashedPassword = CryptoJS.SHA256(userPassword).toString();

            // Crear el nuevo usuario
            const newUser = {
                nombre: userName,
                lastName: userLastname,
                email: userMail,
                password: hashedPassword
            };

            savedUsers.push(newUser);
            localStorage.setItem("usuarios", JSON.stringify(savedUsers));

            goToIndex(); 
        }
    });
}

function configureLogin() {
    let savedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];    
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

        const usuarioEncontrado = savedUsers.find(usuario => usuario.email === emailLogin);
        const hashedPasswordLogin = CryptoJS.SHA256(passwordLogin).toString();

        // Verificar si las credenciales coinciden
        if (!usuarioEncontrado || usuarioEncontrado.password !== hashedPasswordLogin) {
            showWarning(loginContainer, 'loginWarning', 'Correo electrónico o contraseña incorrectos');
        } else {
            goToIndex(); 
        }
    });
}

function goToIndex() {  
    location.href = "../index.html";
    // Crear lógica para popup de bienvenida
}

// Ejecutar funciones según la página actual
document.addEventListener('DOMContentLoaded', () => {
    currentPage === 'login' ? configureLogin() : configureRegister();
});
