// Inicializar el carrito como un array vacío
let cart = [];
const containerModal = document.getElementById("modal-cart");  
// Función para cargar los productos desde el archivo JSON
const loadMerch = async () => {
    try {
        const response = await fetch('../JSON/merch.json'); // Ruta al archivo JSON
        if (!response.ok) throw new Error('Error al obtener los productos');
        const merch = await response.json();
        renderMerch(merch);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
};

// Función para renderizar los productos en el HTML
const renderMerch = (merch) => {
    const container = document.getElementById('productBoxes');
    if (!container) {
        console.error('Contenedor de productos no encontrado');
        return;
    }
    
    const content = merch.map(({ img = './assets/img/default.webp', item = 'Producto no disponible', price = 0 }) => {
        const formattedPrice = price.toLocaleString();
        return `
            <div class="product">
                <img src=".${img}" alt="${item}">
                <div class="descriptionBox">
                    <span>${item}</span><br>
                    <span class="precioMerch">$${formattedPrice}</span>
                    <button class="addToCartBtn" data-img="${img}" data-item="${item}" data-price="${price}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = content;
    addEventListenersToButtons();
};

// Función para agregar eventos a los botones de "Agregar al carrito"
const addEventListenersToButtons = () => {
    const buttons = document.querySelectorAll('.addToCartBtn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { img, item, price } = button.dataset;
            addToCart(img, item, Number(price));
        });
    });
};

// Función para agregar un producto al carrito
const addToCart = (img, item, price) => {
    containerModal.classList.remove("cart-none");
    const existingProductIndex = cart.findIndex(product => product.item === item);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ img, item, price, quantity: 1 });
    }
    updateCart(); // Actualizar la vista del carrito
};

// Función para actualizar el carrito y guardarlo en localStorage
const updateCart = () => {
    const addedProducts = document.getElementById('added-products');
    addedProducts.innerHTML = ''; // Limpiar el contenido previo
    
    cart.forEach((product, index) => {
        const { img, item, price, quantity } = product;
        addedProducts.innerHTML += `
            <div id="added-item-box">
                <div class="img-item-cart">
                    <img src=".${img}" alt="${item}">
                </div>
                <div class="item-cart">
                    <p>${item}</p>
                    <span>$${price.toLocaleString()}</span>
                </div>
                <div class="item-cant">
                    <input type="button" value="-" onclick="changeQuantity(${index}, -1)">
                    <span id="cantidad-items">${quantity}</span>
                    <input type="button" value="+" onclick="changeQuantity(${index}, 1)">
                </div>                          
            </div>
        `;
    });

    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    updateCartItemCount();
};

// Función para cambiar la cantidad de un producto en el carrito
const changeQuantity = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1); // Eliminar si la cantidad es 0
    updateCart(); // Actualizar la vista
};

// Función para actualizar el contador de items en el carrito
const updateCartItemCount = () => {
    const itemsCount = document.getElementById('items-cant');
    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
    itemsCount.textContent = totalItems;
};

// Función para vaciar el carrito con confirmación usando SweetAlert
const emptyCart = async () => {

    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se eliminarán todos los productos del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito'
    });

    if (result.isConfirmed) {
        cart = []; // Vaciar el carrito
        localStorage.removeItem('cart'); // Eliminar de localStorage
        updateCart(); // Actualizar la vista
        await Swal.fire('Carrito vacío', 'Todos los productos han sido eliminados.', 'success');
        containerModal.classList.add("cart-none");
    }
};

// Función para confirmar la compra usando SweetAlert
const purchaseConfirm = async () => {
    const result = await Swal.fire({
        title: '¿Confirmar compra?',
        text: "Tu compra será procesada",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar'
    });

    if (result.isConfirmed) {
        cart = []; // Vaciar el carrito después de la compra
        localStorage.removeItem('cart'); // Eliminar de localStorage
        updateCart(); // Actualizar la vista
        containerModal.classList.add("cart-none");
        await Swal.fire('Compra confirmada', 'Tu compra ha sido realizada con éxito.', 'success');
    }
};

// Función para cerrar el modal y vaciar el carrito opcionalmente
const closeModal = async () => {
    const result = await Swal.fire({
        title: '¿Cerrar el carrito?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar'
    });

    if (result.isConfirmed) {
        document.getElementById('modal-cart').classList.add('cart-none'); // Oculta el modal
        cart = []; // Vaciar el carrito
        localStorage.removeItem('cart'); // Eliminar de localStorage
        updateCart(); // Actualizar la vista
        containerModal.classList.add("cart-none");
    }
};

// Función para cargar el carrito desde localStorage
const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart(); // Actualizar la vista del carrito
    }
};

// Inicializar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    loadMerch();  // Cargar los productos desde JSON
    loadCart();   // Cargar el carrito desde localStorage
});

// Eventos de los botones fuera del HTML
document.getElementById('vaciarCarrito').addEventListener('click', emptyCart);
document.getElementById('comprar').addEventListener('click', purchaseConfirm);
document.querySelector('.nav-modal a').addEventListener('click', closeModal);
