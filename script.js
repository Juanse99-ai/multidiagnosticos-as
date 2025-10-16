/* ===== MENU MÓVIL ===== */
const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
if (btnMenu && menu) {
  btnMenu.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ===== AÑO FOOTER ===== */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* ===== CARRITO ===== */
const cart = [];
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

function fmt(n){ return `$${n.toLocaleString('es-CO')}`; }
function refreshCart(){
  if(!cartItems) return;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx)=>{
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div><strong>${it.name}</strong><br><small>${it.ref || ''}</small></div>
      <div>${fmt(it.price)} x ${it.qty} <button data-i="${idx}">✕</button></div>`;
    cartItems.appendChild(row);
  });
  if (cartCount) cartCount.textContent = cart.reduce((a,b)=>a+b.qty,0);
  if (cartTotal) cartTotal.textContent = fmt(total);
}
document.getElementById('btnCart')?.addEventListener('click', ()=>{
  cartDrawer?.classList.add('open');
});
document.getElementById('closeCart')?.addEventListener('click', ()=>{
  cartDrawer?.classList.remove('open');
});
cartItems?.addEventListener('click', (e)=>{
  const i = e.target.dataset.i;
  if(i){ cart.splice(i,1); refreshCart(); }
});

/* WhatsApp checkout */
document.getElementById('btnWhatsApp')?.addEventListener('click', ()=>{
  if (!cart.length) return;
  const lines = cart.map(p=>`• ${p.name} (${p.ref||''}) x${p.qty} — ${fmt(p.price)}`);
  const total = cart.reduce((a,b)=>a+b.price*b.qty,0);
  const txt = `Hola, quiero confirmar este pedido:%0A%0A${lines.join('%0A')}%0A%0ATotal: ${fmt(total)}%0A`;
  window.open('https://wa.me/573003651525?text='+txt, '_blank');
});

/* ===== PRODUCTOS ===== */
const productGrid = document.getElementById('productGrid');
const q = document.getElementById('q');
const catSel = document.getElementById('cat');

function brandPlaceholder(name){
  const upper = name.toUpperCase();
  if (upper.includes('TUDOR')) return 'assets/products/tudor.png';
  if (upper.includes('BOSCH')) return 'assets/products/bosch.png';
  return 'assets/products/generic.png';
}

let PRODUCTS = [];
async function loadProducts(){
  try{
    const res = await fetch('products.json?v='+Date.now());
    PRODUCTS = await res.json();
    renderProducts();
  }catch(e){
    console.error('Error cargando productos', e);
  }
}
function matches(p){
  const text = (q?.value||'').toLowerCase();
  const c = (catSel?.value||'');
  const hit = !text || (p.name.toLowerCase().includes(text) || (p.ref||'').toLowerCase().includes(text));
  const catOk = !c || (p.category===c);
  return hit && catOk;
}
function renderProducts(){
  if(!productGrid) return;
  productGrid.innerHTML = '';
  PRODUCTS.filter(matches).forEach(p=>{
    const img = p.image || brandPlaceholder(p.name);
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${img}" alt="${p.name}">
      <div><strong>${p.name}</strong><br><small>${p.ref||''}</small></div>
      <div><strong>${fmt(p.price)}</strong></div>
      <button class="btn btn-primary">Agregar al carrito</button>`;
    card.querySelector('button').addEventListener('click',()=>{
      const found = cart.find(x=>x.sku===p.sku);
      if(found) found.qty++; else cart.push({sku:p.sku, name:p.name, ref:p.ref, price:p.price, qty:1});
      refreshCart();
      cartDrawer?.classList.add('open');
    });
    productGrid.appendChild(card);
  });
}
q?.addEventListener('input', renderProducts);
catSel?.addEventListener('change', renderProducts);
loadProducts();

/* ===== AGENDA (mensaje a WhatsApp) ===== */
document.getElementById('bookForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const svc = document.getElementById('bService').value;
  const d = document.getElementById('bDate').value;
  const t = document.getElementById('bTime').value;
  const plate = document.getElementById('bPlate').value;
  const model = document.getElementById('bModel').value;
  const name = document.getElementById('bName').value;
  const phone = document.getElementById('bPhone').value;
  const notes = document.getElementById('bNotes').value || '';
  const msg = `Hola, quiero agendar:%0A- Servicio: ${svc}%0A- Fecha: ${d}%0A- Hora: ${t}%0A- Placa: ${plate}%0A- Modelo: ${model}%0A- Nombre: ${name}%0A- Teléfono: ${phone}%0A- Notas: ${notes}`;
  window.open('https://wa.me/573003651525?text='+msg,'_blank');
});
