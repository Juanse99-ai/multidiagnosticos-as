/* ===== Utilidades ===== */
const money = n => n.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});

/* ===== Menú móvil ===== */
const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
if (btnMenu && menu){
  btnMenu.addEventListener('click', ()=>{
    const open = getComputedStyle(menu).display !== 'none';
    menu.style.display = open ? 'none' : 'flex';
    btnMenu.setAttribute('aria-expanded', String(!open));
  });
}

/* ===== Buscador header → sincroniza con tienda ===== */
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

/* ===== Quick categories ===== */
document.querySelectorAll('.qcat').forEach(a=>{
  a.addEventListener('click', ()=>{
    const cat = a.getAttribute('data-cat');
    const select = document.getElementById('cat');
    if (select){ select.value = cat; select.dispatchEvent(new Event('change')); }
  });
});

/* ===== Tienda desde JSON ===== */
const grid = document.getElementById('productGrid');
const dealsGrid = document.getElementById('dealsGrid');
let PRODUCTS = [];
let CART = [];

function isOnSale(p){
  if(!p.sale || !p.salePrice) return false;
  const now = new Date();
  const start = p.saleStart ? new Date(p.saleStart) : null;
  const end   = p.saleEnd   ? new Date(p.saleEnd)   : null;
  if(start && now < start) return false;
  if(end && now > end) return false;
  return true;
}

async function loadProducts(){
  try{
    const res = await fetch('products.json',{cache:'no-store'});
    PRODUCTS = await res.json();
    renderProducts();
    renderDeals();
  }catch(e){
    console.error('Error cargando products.json', e);
    if (grid) grid.innerHTML = '<p>No se pudieron cargar los productos.</p>';
  }
}

function renderProducts(){
  if (!grid) return;
  const q = (document.getElementById('q')?.value || '').toLowerCase();
  const cat = document.getElementById('cat')?.value || '';

  const filtered = PRODUCTS.filter(p=>{
    const hitQ = !q || [p.name,p.desc,p.brand,p.model].join(' ').toLowerCase().includes(q);
    const hitC = !cat || p.category === cat;
    return hitQ && hitC;
  });

  grid.innerHTML = filtered.map(p=>{
    const sale = isOnSale(p);
    const priceHtml = sale
      ? `<div><span class="price" style="color:#E1122A">${money(p.salePrice)}</span> 
           <del style="color:#8A94A6;margin-left:6px">${money(p.price)}</del>
           ${p.promoText ? `<span class="badge-sale">${p.promoText}</span>`:''}
         </div>`
      : `<div><span class="price">${money(p.price)}</span></div>`;

    return `
      <article class="product ${sale ? 'is-sale':''}" role="listitem" data-id="${p.id}">
        <strong>${p.name}</strong>
        <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/placeholder.png'">
        <small>${p.desc || ''}</small>
        ${priceHtml}
        <div class="qty">
          <button type="button" data-step="-1" aria-label="Menos">-</button>
          <input type="number" value="1" min="1" style="width:54px" aria-label="Cantidad">
          <button type="button" data-step="1" aria-label="Más">+</button>
        </div>
        <button class="btn btn-primary add">Agregar al carrito</button>
      </article>
    `;
  }).join('');

  // qty + add
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

function renderDeals(){
  if (!dealsGrid) return;
  const deals = PRODUCTS.filter(p=>isOnSale(p));
  dealsGrid.innerHTML = deals.length ? deals.map(p=>`
    <article class="product is-sale" role="listitem" data-id="${p.id}">
      <strong>${p.name}</strong>
      <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/placeholder.png'">
      <small>${p.desc||''}</small>
      <div><span class="price" style="color:#E1122A">${money(p.salePrice)}</span>
        <del style="color:#8A94A6;margin-left:6px">${money(p.price)}</del>
        ${p.promoText?`<span class="badge-sale">${p.promoText}</span>`:''}
      </div>
      <button class="btn btn-primary add" data-id="${p.id}">Agregar al carrito</button>
    </article>
  `).join('') : '<p>Por ahora no hay ofertas activas.</p>';

  // botones de deals agregan al carrito
  dealsGrid.querySelectorAll('.add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id');
      addToCart(id, 1);
    });
  });
}

/* Filtros */
document.getElementById('q')?.addEventListener('input', renderProducts);
document.getElementById('cat')?.addEventListener('change', renderProducts);

/* ===== Carrito ===== */
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
        <button data-id="${i.id}" class="btn btn-outline" aria-label="Eliminar">✕</button>
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
  if(!CART.length) return alert('Tu carrito está vacío.');
  const lines = CART.map(i=>{
    const p = PRODUCTS.find(x=>x.id===i.id);
    return `• ${p.name} x${i.qty} = ${money(p.price*i.qty)}`;
  }).join('%0A');
  const total = cartTotal?.textContent || '';
  const msg = `Hola, quiero finalizar mi compra:%0A${lines}%0A%0ATotal: ${total}`;
  window.open(`https://wa.me/573003651525?text=${msg}`,'_blank');
});

/* ===== Form agenda → WhatsApp ===== */
document.getElementById('bookForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const v = id => document.getElementById(id).value;
  const msg = `Hola, quiero agendar:%0A• Servicio: ${v('bService')}%0A• Fecha: ${v('bDate')}%0A• Hora: ${v('bTime')}%0A• Placa: ${v('bPlate')}%0A• Modelo: ${v('bModel')}%0A• Nombre: ${v('bName')}%0A• Teléfono: ${v('bPhone')}%0A• Notas: ${v('bNotes')||'-'}`;
  window.open(`https://wa.me/573003651525?text=${msg}`,'_blank');
});

/* ===== Año footer ===== */
document.getElementById('year')?.append(new Date().getFullYear());

/* ===== Carga inicial ===== */
loadProducts();
