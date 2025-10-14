// =============================
//  CONTROL DE PRODUCTOS Y CARRITO
// =============================

const products = [
  {
    id: 1,
    name: "Aceite Valvoline 10W40",
    price: 85000,
    image: "assets/product-aceite.png",
    category: "Aceites"
  },
  {
    id: 2,
    name: "Filtro de aire Mazda 3",
    price: 45000,
    image: "assets/product-filtro.png",
    category: "Filtros"
  },
  {
    id: 3,
    name: "Pastillas de freno Incolbest 7877",
    price: 95000,
    image: "assets/product-pastillas.png",
    category: "Frenos"
  }
];

const grid = document.getElementById("productGrid");
const btnCart = document.getElementById("btnCart");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// =============================
//  RENDERIZAR PRODUCTOS
// =============================
if (grid) {
  grid.innerHTML = products
    .map(
      (p) => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h4 class="item-name">${p.name}</h4>
      <p class="item-price">$${p.price.toLocaleString()}</p>
      <button class="btn btn-primary addCart" data-id="${p.id}">Agregar al carrito</button>
    </div>
  `
    )
    .join("");

  document.querySelectorAll(".addCart").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      addToCart(id);
    })
  );
}

// =============================
//  FUNCIONES DEL CARRITO
// =============================
let cart = [];

function addToCart(id) {
  const item = products.find((p) => p.id == id);
  const existing = cart.find((c) => c.id == id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = cart
    .map(
      (c) => `
    <div class="cart-item">
      <div>
        <span class="item-name">${c.name}</span><br>
        <small>$${c.price.toLocaleString()} x <span class="item-qty">${c.qty}</span></small>
      </div>
      <button class="remove" data-id="${c.id}">✕</button>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
  cartCount.textContent = cart.length;

  document.querySelectorAll(".remove").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((c) => c.id != id);
      updateCart();
    })
  );
}

// =============================
//  ABRIR Y CERRAR CARRITO
// =============================
btnCart?.addEventListener("click", () => cartDrawer.classList.add("open"));
closeCart?.addEventListener("click", () => cartDrawer.classList.remove("open"));

// =============================
//  FINALIZAR POR WHATSAPP
// =============================
const btnWhatsApp = document.getElementById("btnWhatsApp");

if (btnWhatsApp) {
  btnWhatsApp.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let message = "👋 ¡Hola! Quisiera hacer un pedido desde la tienda *Multidiagnósticos AS*:%0A%0A";
    let total = 0;

    cart.forEach((item) => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      message += `• ${item.name} x${item.qty} - $${subtotal.toLocaleString()}%0A`;
    });

    message += `%0A💰 *Total estimado:* $${total.toLocaleString()}%0A%0A`;
    message += "Por favor confírmame disponibilidad y métodos de pago.%0A";
    message += "Gracias 🙌%0A";

    const phone = "573003651525";
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  });
}
