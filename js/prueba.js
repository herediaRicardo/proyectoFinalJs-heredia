//Desde los inputs, crear validaciones en inicio sesión
//Mostrar cartel de bienvenida
//Registrar cuenta - Mostrar cartel de registrado
//Una vez realizados, envíar a la pagina principal
//Pagina Portfolio
//Con arrays, mostrar cada trabajo.
//También en la página de contacto
document.addEventListener("DOMContentLoaded", function(){   
let nombre;
let edad;
let email;
let tresD = "-Droide Star Wars \n-RPG \n-Escorpión mécanico";
let fotografia = "-Hamburguesa \n-Afeitadora \n-Bar Sherlock";
let motionGraphic = "-Ministerio de la Ciudad \n-Infografía Greenpeace";
let web = "-Landing Page para YPF \n-Api Lollapalloza \n-Fixture Mundial Qatar 2022";

function mensajeAlert(mensaje){
    alert(mensaje);
}

function registrarse(){

    nombre = prompt("Escriba un nombre de usuario");  
    if(nombre == null || nombre.length == 0){
        let nombreIncorrecto = "Escriba un nombre correcto"
        mensajeAlert(nombreIncorrecto); //Acá habría que corregir estos, también podemos declarar la variable con su mensaje.
        registrarse();
    }
    email = prompt("Escriba su mail");
    if(email == null || email.length == 0){
        let mailIncorrecto = "Escriba un mail correcto"
        mensajeAlert(mailIncorrecto);
        registrarse();
    }
    edad = prompt("Escriba su Edad");
    if(isNaN(edad)){
        let edadIncorrecta = "Escoge una edad correcta"
        mensajeAlert(edadIncorrecta);
        registrarse();
    }
    clave = prompt("Escriba su clave \n (No mas de 7 caracteres)"); 
    if(clave == null || clave.length == 0){
        let claveIncorrecta = "Escriba una clave correcta";
        mensajeAlert(claveIncorrecta);
        registrarse();
    };  

    let teHasRegistrado = "¡Excelente, te has registrado! \n \n" + "Usuario Creado:  " + nombre + "\nEmail registrado: " + email + "\nEdad: " + edad +"\nClave Registrada: " + clave;
    mensajeAlert(teHasRegistrado);
    
    //La clave solo aparece para que se vea su funcionalidad.
    navegar();
};

function loguearse(){
    nombre = prompt("Escriba su nombre de usuario");
    clave = prompt("Escriba su clave");    
    mensajeAlert("Perfecto, te has logueado correctamente " + nombre)
    navegar();
};

function navegar(){    

    let salir = false;
    while(!salir){

    const portfolio = parseFloat(prompt("¿Que trabajos queres ver? Elige una opción \n 1 - 3D \n 2 - Fotografía \n 3 - Motion Graphic \n 4 - Desarrollo Web\n \n Otras opciones\n 5 - Registrarse\n 6 - Loguearse\n 7 - Salir"));  

    switch (portfolio){
        case 1:
            let return3D = `Te mostramos los trabajos 3D que realizamos:\n ${tresD}`;
            mensajeAlert(return3D);            
            navegar();
          break;
        case 2:
            let returnFotografia= `Te mostramos los trabajos de Fotografía que realizamos:\n ${fotografia}`;
            mensajeAlert(returnFotografia);   
            navegar();
          break;
        case 3:
            let returnMotion= `Te mostramos los trabajos Motion Graphics que realizamos:\n ${motionGraphic}`;
            mensajeAlert(returnMotion);   
            navegar();
          break;
        case 4:
            let returnWeb= `Te mostramos los trabajos de Desarrollo Web que realizamos:\n ${web}`;
            mensajeAlert(returnWeb);   
            navegar();
          break;
        case 5:
            registrarse();
          break;
        case 6:
            loguearse();
          break;
        case 7:
            salir = true;
          break;
        default:
            mensajeAlert("Atención, no has elegido ningún número");
          break;
    }
  }
};

function bienvenido(){  
let inicio = parseFloat(prompt("¿Hola, como estás? Elige una opción \n 1 - Registrarse \n 2 - Loguearse \n 3 - Solo quiero navegar \n 4 - Salir"));

    switch (inicio){
        case 1:
            registrarse();
            mensajeAlert("Navegar en la pagina");
            navegar();
        break;
        case 2:
            loguearse();
            navegar();
        break;
        case 3:
            navegar();   
            break;
        case 4:
            inicio = 4;
            break;
        default:
            mensajeAlert("No has escogido ningun numero")
            bienvenido(); 
            break;             
  }
};

alert("Bienvenido a la página Noiser Creative");
bienvenido();

while(inicio !== 4){
    if(inicio === 1){
        registrarse();
        mensajeAlert("Navegar en la pagina");    
    }else if(inicio === 2){
        loguearse();
    }else if(inicio === 3){
        navegar();
    }

    if(inicio === 4){
        inicio = 4;
    }
}   

}) //termina el DomContentLoader



