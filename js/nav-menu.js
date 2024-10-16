const menuHamburguesa = document.getElementById('menuHamburguesa');
const menuMovil = document.getElementById('menuMovil');

menuHamburguesa.addEventListener('click', () => {
    menuMovil.classList.toggle('activo');
    menuHamburguesa.classList.toggle('activo');
});