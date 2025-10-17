/* ===== MENÚ MÓVIL ===== */
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

/* ====== PRODUCTOS ====== */
let PRODUCTS = [];
const productGrid = document.getElementById('productGrid');
const q2 = document.getElementById('q2');
const catSel = document.getElementById('cat');

/* ---- Utilidades de imágenes ---- */
const IMG_VER = 'v=4'; // cache-buster (sube el número si no ves cambios)

/** Asegura ruta válida (absoluta) y agrega cache-buster */
function normImgUrl(u = '') {
  if (!u) return '';
  // si es absoluta (http/https) o ya empieza en /
  if (/^https?:\/\//i.test(u) || u.startsWith('/')) {
    return u + (u.includes('?') ? '&' : '?') + IMG_VER;
  }
  // relativa -> a raíz del sitio
  return '/' + u.replace(/^\.?\//, '') + (u.includes('?') ? '&' : '?') + IMG_VER;
}

/** Mapea imagen por marca (nombre + referencia) */
function brandImageFromName(name = "") {
  const n = (name || "").toLowerCase();

  if (/\btudor\b/.test(n))  return normImgUrl('assets/products/tudor.png');
  if (/\bbosch\b/.test(n))  return normImgUrl('assets/products/bosch.png');

  return normImgUrl('assets/products/generic.png');
}

/* Filtro de búsqueda/categoría */
function matches(p){
  const text = (q2?.value||'').toLowerCase();
  const c = (catSel?.value||'');
  const hit = !text || (p.name.toLowerCase().includes(text) || (p.ref||'').toLowerCase().includes(text));
  const catOk = !c || (p.category===c);
  return hit && catOk;
}

/* Render de tarjetas */
function renderProducts(){
  if(!productGrid) return;
  productGrid.innerHTML = '';

  PRODUCTS.filter(matches).forEach(p=>{
    // Decide imagen: 1) p.image válida 2) marca por nombre/ref 3) genérica
    const candidate = (p.image && String(p.image).trim())
      ? normImgUrl(p.image.trim())
      : brandImageFromName(`${p.name||''} ${p.ref||''}`);

    const card = document.createElement('div');
    card.className = 'product';

    // Construimos el contenido
    card.innerHTML = `
      <img src="${candidate}" alt="${p.name}"
           onerror="this.onerror=null;this.src='/assets/products/generic.png?${IMG_VER}'">
      <div><strong>${p.name}</strong><br><small>${p.ref||""}</small></div>
      <div><strong>${fmt(p.price)}</strong></div>
      <button class="btn btn-primary">Agregar al carrito</button>
    `;

    // carrito
    card.querySelector('button').addEventListener('click',()=>{
      const found = cart.find(x=>x.sku===p.ref);
      if(found) found.qty++; else cart.push({sku:p.ref,name:p.name,ref:p.ref,price:p.price,qty:1});
      refreshCart();
      cartDrawer?.classList.add('open');
    });

    productGrid.appendChild(card);
  });
}

/* Cargar JSON */
async function loadProducts(){
  try{
    const res = await fetch('/products.json',{cache:'no-store'});
    PRODUCTS = await res.json();
    renderProducts();
  }catch(e){ console.error('Error cargando productos', e); }
}
q2?.addEventListener('input', renderProducts);
catSel?.addEventListener('change', renderProducts);

// Carga cuando el DOM está listo (por si el script carga en <head>)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProducts);
} else {
  loadProducts();
}

/* ====== CARRITO ====== */
const cart = [];
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const btnCart = document.getElementById('btnCart');

function fmt(n){ return `$${
  n.toLocaleString('es-CO')
}`; }

function refreshCart(){
  if(!cartItems) return;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx)=>{
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div><strong>${it.name}</strong><br><small>${it.ref||""}</small></div>
      <div>${fmt(it.price)} × ${it.qty} <button data-i="${idx}">x</button></div>
    `;
    cartItems.appendChild(row);
  });
  if(cartCount) cartCount.textContent = cart.reduce((a,b)=>a+b.qty,0);
  if(cartTotal) cartTotal.textContent = fmt(total);
  cartItems.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click',()=>{
      cart.splice(+b.dataset.i,1);
      refreshCart();
    });
  });
}
btnCart?.addEventListener('click',()=>cartDrawer?.classList.add('open'));
closeCart?.addEventListener('click',()=>cartDrawer?.classList.remove('open'));

/* Finalizar por WhatsApp */
document.getElementById('btnWhatsApp')?.addEventListener('click', ()=>{
  if(cart.length===0) return;
  const lines = cart.map(it=>`• ${it.name} (${it.ref||""}) × ${it.qty} – ${fmt(it.price)}`).join('%0A');
  const url = `https://wa.me/573003651525?text=Hola,%20quiero%20comprar:%0A${lines}%0ATotal:%20${encodeURIComponent(cartTotal.textContent||'')}`;
  window.open(url,'_blank','noopener');
});

/* ====== Agenda a WhatsApp ====== */
document.getElementById('bookForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const svc = document.getElementById('bService').value;
  const date = document.getElementById('bDate').value;
  const time = document.getElementById('bTime').value;
  const plate= document.getElementById('bPlate').value;
  const model= document.getElementById('bModel').value;
  const name = document.getElementById('bName').value;
  const phone= document.getElementById('bPhone').value;
  const notes= document.getElementById('bNotes').value || '';
  const text = `Hola, quiero agendar: ${svc}%0AFecha: ${date}%0AHora: ${time}%0APlaca: ${plate}%0AModelo: ${model}%0ANombre: ${name}%0ATeléfono: ${phone}%0ANotas: ${notes}`;
  window.open(`https://wa.me/573003651525?text=${text}`,'_blank','noopener');
});
