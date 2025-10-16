/* UTILIDAD: formato moneda */
const money = n => n.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});

/* MENÚ MÓVIL */
const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
if (btnMenu && menu){
  btnMenu.addEventListener('click', ()=>{
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
    btnMenu.setAttribute('aria-expanded', !open);
  });
}

/* BUSCADOR HEADER sincroniza con tienda */
const headerSearch = document.getElementById('headerSearch');
if (headerSearch){
  headerSearch.addEventListener('submit', e=>{
    e.preventDefault();
    const qInput = headerSearch.querySelector('input[name="query"]');
    const q = qInput.value || '';
    const storeQ = document.getElementById('q');
    if (storeQ){ storeQ.value = q; storeQ.dispatchEvent(new Event('input')); }
    document.querySelector('#catalogo')?.scrollIntoView({behavior:'smooth'});
  });
}

/* CATEGORÍAS RÁPIDAS */
document.querySelectorAll('.qcat').forEach(a=>{
  a.addEventListener('click', ()=>{
    const cat = a.getAttribute('data-cat');
    const select = document.getElementById('cat');
    if (select){ select.value = cat; select.dispatchEvent(new Event('change')); }
  });
});

/* TIENDA: cargamos JSON */
const grid = document.getElementById('productGrid');
let PRODUCTS = [];
let CART = [];

async function loadProducts(){
  try{
    const res = await fetch('products.json',{cache:'no-store'});
    PRODUCTS = await res.json();
    renderProducts();
  }catch(e){
    console.error('Error cargando productos.json', e);
    if (grid) grid.innerHTML = '<p>No se pudieron cargar los productos.</p>';
  }
}

/* RENDER DE PRODUCTOS con filtros */
function renderProducts(){
  if (!grid) return;
  const q = (document.getElementById('q')?.value || '').toLowerCase();
  const cat = document.getElementById('cat')?.value || '';

  const filtered = PRODUCTS.filter(p=>{
    const hitQ = !q || [p.name,p.desc,p.brand,p.model].join(' ').toLowerCase().includes(q);
    const hitC = !cat || p.category === cat;
    return hitQ && hitC;
  });

  grid.innerHTML = filtered.map(p=>`
    <article class="product" data-id="${p.id}">
      <strong>${p.name}</strong>
      <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/placeholder.png'">
      <small>${p.desc || ''}</small>
      <div><span class="price">${money(p.price)}</span></div>
      <div class="qty">
        <button type="button" data-step="-1">-</button>
        <input type="number" value="1" min="1" style="width:54px">
        <button type="button" data-step="1">+</button>
      </div>
      <button class="btn btn-primary add">Agregar al carrito</button>
    </article>
  `).join('');

  // qty handlers y add-to-cart
  grid.querySelectorAll('.product').forEach(card=>{
    const input = card.querySelector('input[type="number"]');
    card.querySelectorAll('button[data-step]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const step = Number(b.dataset.step);
        const v = Math.max(1, Number(input.value||1) + step);
        input.value = v;
      });
    });
    card.querySelector('.add')?.addEventListener('click', ()=>{
      const id = card.dataset.id;
      const qty = Math.max(1, Number(input.value||1));
      addToCart(id, qty);
    });
  });
}

/* EVENTOS FILTROS */
document.getElementById('q')?.addEventListener('input', renderProducts);
document.getElementById('cat')?.addEventListener('change', renderProducts);

/* CARRITO */
const drawer = document.getElementById('cartDrawer');
const btnCart = document.getElementById('btnCart');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

btnCart?.addEventListener('click', ()=> drawer?.classList.add('open'));
closeCart?.addEventListener('click', ()=> drawer?.classList.remove('open'));

function addToCart(id, qty=1){
  const item = PRODUCTS.find(p=>p.id===id);
  if(!item) return;
  const found = CART.find(i=>i.id===id);
  if(found) found.qty += qty; else CART.push({id,qty});
  renderCart();
}

function renderCart(){
  if(!cartItems) return;
  const rows = CART.map(i=>{
    const p = PRODUCTS.find(x=>x.id===i.id);
    const subtotal = p.price * i.qty;
    return `
      <div class="cart-item">
        <div><strong>${p.name}</strong><br><small>${money(p.price)} × ${i.qty}</small></div>
        <div>${money(subtotal)}</div>
        <button data-id="${i.id}" class="btn btn-outline">✕</button>
      </div>
    `;
  }).join('');
  cartItems.innerHTML = rows || '<p>Tu carrito está vacío.</p>';
  const total = CART.reduce((a,i)=>{
    const p = PRODUCTS.find(x=>x.id===i.id);
    return a + (p.price * i.qty);
  },0);
  if(cartTotal) cartTotal.textContent = money(total);
  if(cartCount) cartCount.textContent = CART.reduce((a,i)=>a+i.qty,0);

  cartItems.querySelectorAll('button[data-id]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const id = b.getAttribute('data-id');
      CART = CART.filter(x=>x.id!==id);
      renderCart();
    });
  });
}

/* WhatsApp checkout del carrito */
document.getElementById('btnWhatsApp')?.addEventListener('click', ()=>{
  if(!CART.length) return;
  const lines = CART.map(i=>{
    const p = PRODUCTS.find(x=>x.id===i.id);
    return `• ${p.name} x${i.qty} = ${money(p.price*i.qty)}`;
  }).join('%0A');
  const total = cartTotal?.textContent || '';
  const msg = `Hola, quiero finalizar mi compra:%0A${lines}%0A%0ATotal: ${total}`;
  window.open(`https://wa.me/573003651525?text=${msg}`,'_blank');
});

/* FORM AGENDA -> WhatsApp */
document.getElementById('bookForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const s = id=>document.getElementById(id).value;
  const msg = `Hola, quiero agendar:%0A• Servicio: ${s('bService')}%0A• Fecha: ${s('bDate')}%0A• Hora: ${s('bTime')}%0A• Placa: ${s('bPlate')}%0A• Modelo: ${s('bModel')}%0A• Nombre: ${s('bName')}%0A• Teléfono: ${s('bPhone')}%0A• Notas: ${s('bNotes')||'-'}`;
  window.open(`https://wa.me/573003651525?text=${msg}`,'_blank');
});

/* Año footer */
document.getElementById('year')?.append(new Date().getFullYear());

/* Carga inicial */
loadProducts();
