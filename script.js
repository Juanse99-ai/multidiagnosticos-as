/* ===== UTILIDADES ===== */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

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
const IMG_VER = 'v10';

function norm(u=''){
  if(!u) return '';
  if (/^https?:\/\//i.test(u) || u.startsWith('/'))
    return u + (u.includes('?') ? '&' : '?') + IMG_VER;
  return '/' + u.replace(/^\.?\//,'') + (u.includes('?') ? '&' : '?') + IMG_VER;
}

function brandImageFromName(name=''){
  const n = (name||'').toLowerCase();
  if (n.includes('tudor')) return norm('assets/products/tudor.png');
  if (n.includes('bosch')) return norm('assets/products/bosch.png');
  return norm('assets/products/generic.png');
}

function imgFallback(el){
  if (!el || el.__tried) return;
  el.__tried = true;
  const src = (el.getAttribute('src')||'').replace(/\?.*$/,'');
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

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = p.name;
    img.onerror = function(){ imgFallback(this); };
    card.appendChild(img);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'product-title';
    const strong = document.createElement('strong');
    strong.textContent = p.name;
    titleDiv.appendChild(strong);
    if (p.ref) {
      titleDiv.appendChild(document.createElement('br'));
      const small = document.createElement('small');
      small.textContent = p.ref;
      titleDiv.appendChild(small);
    }
    card.appendChild(titleDiv);

    const priceDiv = document.createElement('div');
    const priceStrong = document.createElement('strong');
    priceStrong.textContent = fmt(p.price);
    priceDiv.appendChild(priceStrong);
    card.appendChild(priceDiv);

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Agregar al carrito';
    btn.addEventListener('click', ()=>{
      const found = cart.find(x=>x.sku===p.ref);
      if(found) found.qty++; else cart.push({sku:p.ref,name:p.name,ref:p.ref,price:p.price,qty:1});
      refreshCart();
      openCart();
    });
    card.appendChild(btn);

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
    ev.preventDefault();
    const c = a.getAttribute('data-cat') || '';
    const sel = document.getElementById('cat');
    if(sel){ sel.value = c; }
    renderProducts();
    const el = document.getElementById('catalogo');
    if(el) el.scrollIntoView({behavior:'smooth'});
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

function openCart(){
  if(!cartDrawer) return;
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}
function closeCartDrawer(){
  if(!cartDrawer) return;
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

function refreshCart(){
  if(!cartItems) return;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx)=>{
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';

    const info = document.createElement('div');
    const nameStrong = document.createElement('strong');
    nameStrong.textContent = it.name;
    info.appendChild(nameStrong);
    if (it.ref) {
      info.appendChild(document.createElement('br'));
      const small = document.createElement('small');
      small.textContent = it.ref;
      info.appendChild(small);
    }
    row.appendChild(info);

    const actions = document.createElement('div');
    actions.textContent = `${fmt(it.price)} × ${it.qty} `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.dataset.i = idx;
    removeBtn.addEventListener('click', ()=>{
      cart.splice(idx, 1);
      refreshCart();
    });
    actions.appendChild(removeBtn);
    row.appendChild(actions);

    cartItems.appendChild(row);
  });
  if(cartCount) cartCount.textContent = cart.reduce((a,b)=>a+b.qty,0);
  if(cartTotal) cartTotal.textContent = fmt(total);
}
btnCart?.addEventListener('click', openCart);
closeCart?.addEventListener('click', closeCartDrawer);

/* Finalizar por WhatsApp */
document.getElementById('btnWhatsApp')?.addEventListener('click', ()=>{
  if(cart.length===0) return;
  const lines = cart.map(it=>`• ${it.name} (${it.ref||""}) × ${it.qty} – ${fmt(it.price)}`).join('\n');
  const totalText = cartTotal?.textContent || '';
  const msg = `Hola, quiero comprar:\n${lines}\nTotal: ${totalText}`;
  window.open(`https://wa.me/573003651525?text=${encodeURIComponent(msg)}`,'_blank','noopener');
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
  const msg = `Hola, quiero agendar: ${svc}\nFecha: ${date}\nHora: ${time}\nPlaca: ${plate}\nModelo: ${model}\nNombre: ${name}\nTeléfono: ${phone}\nNotas: ${notes}`;
  window.open(`https://wa.me/573003651525?text=${encodeURIComponent(msg)}`,'_blank','noopener');
});

/* Carga inicial de productos */
if (document.readyState !== 'loading') loadProducts();
else document.addEventListener('DOMContentLoaded', loadProducts);

/* ===== Header: cambiar a fondo sólido al hacer scroll ===== */
(function () {
  const THRESHOLD = 40;
  function handleScroll() {
    if (window.scrollY > THRESHOLD) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* ===== Banner de Promos (slider) ===== */
(function(){
  const IMGS = [
    '/assets/banner-aceite.webp',
    '/assets/banner-baterias.webp',
    '/assets/banner-frenos.webp'
  ];
  const FALLBACK = '/assets/fondo-taller.webp';

  const track = document.getElementById('hsTrack');
  const dotsWrap = document.getElementById('hsDots');
  const prev = document.querySelector('.hs__arrow.prev');
  const next = document.querySelector('.hs__arrow.next');
  if(!track) return;

  const sources = IMGS.length ? IMGS : [FALLBACK];
  sources.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'hs__slide';
    const img = new Image();
    img.src = src;
    img.alt = 'Promoción ' + (i + 1);
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.style.transition = 'opacity .5s ease';
    img.style.opacity = '0';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'hs__dot';
    dot.setAttribute('aria-label', 'Ir a promoción ' + (i + 1));
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });

  const slides = Array.from(track.children);
  const dots = Array.from(dotsWrap.children);

  let idx = 0;
  let timer = null;
  const DURATION = 4500;

  function paint(){
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }
  function goTo(n, stopAuto){
    idx = (n + slides.length) % slides.length;
    paint();
    if(stopAuto) restart();
  }
  function nextSlide(){ goTo(idx + 1); }
  function prevSlide(){ goTo(idx - 1); }

  prev && prev.addEventListener('click', () => goTo(idx - 1, true));
  next && next.addEventListener('click', () => goTo(idx + 1, true));

  const slider = document.getElementById('hs');
  function start(){ timer = setInterval(nextSlide, DURATION); }
  function stop(){ clearInterval(timer); timer = null; }
  function restart(){ stop(); start(); }

  slider && slider.addEventListener('mouseenter', stop);
  slider && slider.addEventListener('mouseleave', start);

  let sx = 0;
  slider && slider.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); }, {passive: true});
  slider && slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) (dx < 0 ? nextSlide() : prevSlide());
    start();
  }, {passive: true});

  paint(); start();
})();
