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

/* ---- utilidades de imágenes y cache-buster ---- */
const IMG_VER = 'v8';

// normaliza URL (absoluta o relativa) y agrega cache-buster
function norm(u=''){
  if(!u) return '';
  if (/^https?:\/\//i.test(u) || u.startsWith('/'))
    return u + (u.includes('?') ? '&' : '?') + IMG_VER;
  return '/' + u.replace(/^\.?\//,'') + (u.includes('?') ? '&' : '?') + IMG_VER;
}

// mapea por marca
function brandImageFromName(name=''){
  const n = (name||'').toLowerCase();
  if (n.includes('tudor')) return norm('assets/products/tudor.png');
  if (n.includes('bosch')) return norm('assets/products/bosch.png');
  return norm('assets/products/generic.png');
}

// onerror inteligente: prueba rutas alternativas y termina en genérico
function imgFallback(el){
  if (!el || el.__tried) return;
  el.__tried = true;
  const src = (el.getAttribute('src')||'').replace(/\?.*$/,''); // sin query
  const alts = [];
  if (src.startsWith('/assets/products/')) {
    alts.push(src.replace('/assets/products/','/assets/'));
  } else if (src.startsWith('/assets/')) {
    alts.push(src.replace('/assets/','/assets/products/'));
  }
  alts.push('/assets/products/generic.png','/assets/generic.png');

  (function tryNext(i){
    if (i>=alts.length) return;
    const test = new Image();
    test.onload = ()=>{ el.src = norm(alts[i]); };
    test.onerror = ()=> tryNext(i+1);
    test.src = alts[i] + '?poke=' + Date.now();
  })(0);
}

/* Búsqueda / categoría */
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
    const imgUrl = (p.image && p.image.trim()) ? norm(p.image) : brandImageFromName(p.name||'');
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${imgUrl}" alt="${p.name}" onerror="imgFallback(this)">
      <div class="product-title"><strong>${p.name}</strong><br><small>${p.ref||""}</small></div>
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

/* ===== Quickcats (set categoría y baja al catálogo) ===== */
document.querySelectorAll('.quickcat').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    const c = a.getAttribute('data-cat') || '';
    const sel = document.getElementById('cat');
    if(sel){ sel.value = c; }
    const el = document.getElementById('catalogo');
    if(el) el.scrollIntoView({behavior:'smooth'});
    renderProducts();
  });
});

/* ====== CARRITO ====== */
const cart = [];
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const btnCart = document.getElementById('btnCart');

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

/* Carga inicial de productos (después de DOM ready si el script va en <head>) */
if (document.readyState !== 'loading') loadProducts();
else document.addEventListener('DOMContentLoaded', loadProducts);
