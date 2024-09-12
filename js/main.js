document.getElementById('crearCuenta').addEventListener('click', (event) => {

    event.preventDefault();

   let formIsValid = true;
   
        const userName = document.getElementById('nameRegister');
        const userNameRegister = userName.value;
        let containerName = document.getElementById("cajaRegisterName");
        let nameWarning = document.getElementById('nameWarning');

        if (userNameRegister === "" || userNameRegister === null || userNameRegister === undefined) {
            if (!nameWarning) {
                nameWarning = document.createElement('div');
                nameWarning.id = 'nameWarning';
                nameWarning.innerHTML = '<span>Ingrese un nombre correcto</span>';
                containerName.appendChild(nameWarning);
            }
            formIsValid = false;
        } else {
            // Si ya existía el mensaje de advertencia y el campo es válido, eliminar el mensaje
            if (nameWarning) {
                containerName.removeChild(nameWarning);
            }
        }
    
        const userLastname = document.getElementById('lastNameRegister');
        const dataLastname = userLastname.value;
        let containerLastName = document.getElementById("cajaRegisterLastName");
        let lastNameWarning = document.getElementById('lastNameWarning');
        
        if (dataLastname === "" || dataLastname === "null" || dataLastname === "undefined") {
            if (!lastNameWarning) {
                lastNameWarning = document.createElement('div');
                lastNameWarning.id = 'lastNameWarning';
                lastNameWarning.innerHTML = '<span>Ingrese un apellido correcto</span>';
                containerLastName.appendChild(lastNameWarning);
            }
            formIsValid = false;
        } else {
            if (lastNameWarning) {
                containerLastName.removeChild(lastNameWarning);
            }
        }
    
        const userMail = document.getElementById('emailRegister');
        const dataMail = userMail.value;
        let containerMail = document.getElementById("cajaRegisterMail");
        let mailWarning = document.getElementById('mailWarning');
        
        if (dataMail === "" || dataMail === "null" || dataMail === "undefined") {
            if (!mailWarning) {
                mailWarning = document.createElement('div');
                mailWarning.id = 'mailWarning';
                mailWarning.innerHTML = '<span>Ingrese un mail correcto</span>';
                containerMail.appendChild(mailWarning);
            }
            formIsValid = false;
        } else {
            if (mailWarning) {
                containerMail.removeChild(mailWarning);
            }
        }
    
        const userPassword = document.getElementById('passwordRegister');
        const dataPassword = userPassword.value;
        let containerPassword = document.getElementById("cajaRegisterPassword");
        let passwordWarning = document.getElementById('passwordWarning');
        
        if (dataPassword === "" || dataPassword === "null" || dataPassword === "undefined") {
            if (!passwordWarning) {
                passwordWarning = document.createElement('div');
                passwordWarning.id = 'passwordWarning';
                passwordWarning.innerHTML = '<span>Ingrese una contraseña correcta</span>';
                containerPassword.appendChild(passwordWarning);
            }
            formIsValid = false;
        } else {
            if (passwordWarning) {
                containerPassword.removeChild(passwordWarning);
            }
        }
    
    // Validación de la confirmación de contraseña
    const userPasswordConfirm = document.getElementById('passwordRegisterConfirm');
    const dataPasswordConfirm = userPasswordConfirm.value;
    let containerPasswordConfirm = document.getElementById("cajaRegisterPasswordConfirm");
    let passwordWarningConfirm = document.getElementById('passwordWarningConfirm');
    
    if (dataPassword !== dataPasswordConfirm || dataPasswordConfirm === "" || dataPasswordConfirm === "null" || dataPasswordConfirm === "undefined") {
        if (!passwordWarningConfirm) {
            passwordWarningConfirm = document.createElement('div');
            passwordWarningConfirm.id = 'passwordWarningConfirm';
            passwordWarningConfirm.innerHTML = '<span>La contraseña es diferente</span>';
            containerPasswordConfirm.appendChild(passwordWarningConfirm);
        }
        formIsValid = false;
    } else {
        if (passwordWarningConfirm) {
            containerPasswordConfirm.removeChild(passwordWarningConfirm);
        }
    }

    // Si todo está validado correctamente, navega
    if (formIsValid) {
        navegar();
    }

});

// function validateRegister(identifyInput){
//     let validateWarning = document.getElementById('')
// }



function navegar(){  

     location.href = "../index.html"
};