let cart = [];
const modal = document.getElementById("myModal");
const containerModal = document.getElementById("modal-cart");  

// Función para cargar los productos desde el archivo JSON
const loadMerch = async () => {
  try {
      const response = await fetch('../JSON/merch.json');
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
  document.querySelectorAll('.addToCartBtn').forEach(button => {
      button.addEventListener('click', () => {
          const { img, item, price } = button.dataset;
          addToCart(img, item, Number(price));
      });
  });
};


// Función para agregar un producto al carrito
const addToCart = (img, item, price) => {
  containerModal.classList.remove("cart-none");
  const existingProduct = cart.find(product => product.item === item);
  
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push({ img, item, price, quantity: 1 }); 
  }
  
  updateCart();
};

// Función para actualizar el carrito y guardarlo en localStorage
const updateCart = () => {
  const addedProducts = document.getElementById('added-products');
  addedProducts.innerHTML = '';
  
  cart.forEach(({ img, item, price, quantity }, index) => {
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

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItemCount();
  updateTotalPrice();
};


// Función para cambiar la cantidad de un producto en el carrito
const changeQuantity = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
    if(cart < 1){
      hideModal();
    }
};

// Función para actualizar el contador de items en el carrito
const updateCartItemCount = () => {
  const itemsCount = document.getElementById('items-cant');
  const totalItems = cart.reduce((acc, { quantity }) => acc + quantity, 0);
  itemsCount.textContent = totalItems;

  const cantProducts = document.getElementById('cant-products');
  cantProducts.textContent = totalItems;
};

// Función para calcular y actualizar el precio total del carrito
const updateTotalPrice = () => {
  const totalPrice = cart.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
  document.getElementById('total-price').textContent = totalPrice.toLocaleString();
  document.getElementById('total-confirm').textContent = totalPrice.toLocaleString();
};

// Función para vaciar el carrito con confirmación usando SweetAlert
const emptyCart = async () => {
  const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Se eliminarán todos los productos del carrito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#66C5E1',
      cancelButtonColor: '#E7328A',
      confirmButtonText: 'Sí, vaciar carrito'
  });

  if (result.isConfirmed) {      
      hideModal();
      cart = [];
      localStorage.removeItem('cart');
      updateCart();
      await Swal.fire('Carrito vacío', 'Todos los productos han sido eliminados.', 'success');
  }
};

// Función para confirmar la compra usando SweetAlert
const purchaseConfirm = async () => {
  try {
      const mail = document.getElementById('mail').value;
      const direccion = document.getElementById('direccion').value;
      const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked');
      const metodoPago = document.querySelector('input[name="select-efectivo"]:checked');

      // Validaciones
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) throw new Error('Por favor, ingresa un correo electrónico válido.');
      if (!direccion.trim()) throw new Error('Por favor, ingresa una dirección válida.');
      if (!tipoEntrega) throw new Error('Por favor, selecciona un tipo de entrega (Retiro o Entrega).');
      if (!metodoPago) throw new Error('Por favor, selecciona un método de pago.');

      // Si todo está bien, confirmo la compra
      const result = await Swal.fire({
          title: '¿Confirmar compra?',
          text: "Tu compra será procesada",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#66C5E1',
          cancelButtonColor: '#E7328A',
          confirmButtonText: 'Sí, comprar'
      });

      if (result.isConfirmed) {
          cart = [];
          localStorage.removeItem('cart');    
          updateCart();
          containerModal.classList.add("cart-none");
          await Swal.fire('Compra confirmada', 'Tu compra ha sido realizada con éxito.', 'success');
          modalWindowClosed();
      }
  } catch (error) {
      await Swal.fire('Error', error.message, 'error'); 
  }
};



const modalWindowOpen = () => {
// Obtener el modal y botones
const closeModalButton = document.querySelector(".close");
modal.style.display = "block";

closeModalButton.onclick = function() {
  modalWindowClosed();
};

window.onclick = function(event) {
    if (event.target == modal) {
      modalWindowClosed();
    }
};
};

const modalWindowClosed = () => {
modal.style.display = "none";
}

// Función para cerrar el modal y vaciar el carrito opcionalmente
const closeModal = async () => {
  const result = await Swal.fire({
      title: '¿Cerrar el carro de compras?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#66C5E1',
      cancelButtonColor: '#E7328A',
      confirmButtonText: 'Sí, cerrar'
  });

  if (result.isConfirmed) {
      document.getElementById('modal-cart').classList.add('cart-none');
      cart = [];
      localStorage.removeItem('cart');
      updateCart();
      hideModal();
  }
};

// Función para cargar el carrito desde localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
  }
};

const hideModal = () => {
containerModal.classList.add("cart-none");
};


// Inicializar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  loadMerch();
  loadCart();
  document.getElementById('vaciarCarrito').addEventListener('click', emptyCart);
  document.getElementById('continuar').addEventListener('click', modalWindowOpen);
  document.getElementById('comprar-final').addEventListener('click', purchaseConfirm);
  document.querySelector('.nav-modal a').addEventListener('click', closeModal);
});

