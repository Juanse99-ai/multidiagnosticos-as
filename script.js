
const $ = (q)=>document.querySelector(q);
const money=(v)=>v.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});
const cartDrawer=$('#cartDrawer'), overlay=$('#overlay'), cartItems=$('#cartItems'), cartTotal=$('#cartTotal'), cartCount=$('#cartCount');
let cart=JSON.parse(localStorage.getItem('md_cart')||'[]');
function persist(){localStorage.setItem('md_cart',JSON.stringify(cart));renderCart();cartCount.textContent=cart.reduce((a,b)=>a+b.qty,0);}
function addToCart(p,qty=1){const f=cart.find(i=>i.id===p.id);f?f.qty+=qty:cart.push({...p,qty});persist();openCart();}
function changeQty(id,d){const it=cart.find(i=>i.id===id);if(!it)return;it.qty=Math.max(1,it.qty+d);persist();}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);persist();}
function renderCart(){cartItems.innerHTML='';if(cart.length===0){cartItems.innerHTML='<p class="muted">Tu carrito está vacío.</p>';cartTotal.textContent=money(0);return;}let total=0;cart.forEach(i=>{total+=i.precio*i.qty;const row=document.createElement('div');row.className='cart-item';row.innerHTML=`<div class="title">${i.nombre}</div><div class="price">${money(i.precio*i.qty)}</div><div class="row muted">${i.marca} • ${i.codigo} • SKU:${i.sku||''}</div><div class="row"><div class="qty"><button data-dec="${i.id}">–</button><span>${i.qty}</span><button data-inc="${i.id}">+</button></div><button class="remove" data-del="${i.id}">Quitar</button></div>`;cartItems.appendChild(row);row.querySelector(`[data-dec="${i.id}"]`).onclick=()=>changeQty(i.id,-1);row.querySelector(`[data-inc="${i.id}"]`).onclick=()=>changeQty(i.id,+1);row.querySelector(`[data-del="${i.id}"]`).onclick=()=>removeFromCart(i.id);});cartTotal.textContent=money(total);}
function openCart(){cartDrawer.classList.add('open');overlay.classList.add('show');}function closeCart(){cartDrawer.classList.remove('open');overlay.classList.remove('show');}
document.getElementById('btnCart').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;overlay.onclick=closeCart;document.getElementById('btnWhatsApp').onclick=()=>{const phone='573003651525';const lines=cart.map(i=>`• ${i.nombre} (${i.marca} ${i.codigo}) x${i.qty} — ${money(i.precio*i.qty)}`).join('%0A');const total=cart.reduce((a,b)=>a+b.precio*b.qty,0);const text=`Hola Multidiagnósticos AS,%0ASolicito cotización/compra:%0A${lines}%0ATotal: ${money(total)}%0ANombre:`;window.open(`https://wa.me/${phone}?text=${text}`,'_blank');};
const grid=document.getElementById('productGrid'), q=document.getElementById('q'), cat=document.getElementById('cat');let PRODUCTS=[];
async function loadProducts(){const res=await fetch('data/products.json');PRODUCTS=await res.json();renderProducts();}
function renderProducts(){grid.innerHTML='';const term=(q?.value||'').toLowerCase(), c=cat?.value;PRODUCTS.filter(p=>{const txt=(p.nombre+' '+p.marca+' '+p.codigo).toLowerCase();return(!term||txt.includes(term))&&(!c||p.categoria===c)}).forEach(p=>{const el=document.createElement('article');el.className='product';el.setAttribute('role','listitem');el.innerHTML=`<img src="assets/${p.img||'placeholder.png'}" alt="${p.nombre}" loading="lazy"><div class="muted">${p.marca} • ${p.codigo}</div><h4>${p.nombre}</h4><div class="muted">${p.categoria} • SKU:${p.sku||''} • Stock:${p.stock??'–'}</div><div class="price">${money(p.precio)}</div><div class="act"><div class="qty"><button data-minus="${p.id}">–</button><span id="q-${p.id}">1</span><button data-plus="${p.id}">+</button></div><button class="btn btn-primary" data-add="${p.id}">Agregar</button></div>`;grid.appendChild(el);let qty=1;el.querySelector(`[data-minus="${p.id}"]`).onclick=()=>{qty=Math.max(1,qty-1);el.querySelector('#q-'+p.id).textContent=qty;};el.querySelector(`[data-plus="${p.id}"]`).onclick=()=>{qty+=1;el.querySelector('#q-'+p.id).textContent=qty;};el.querySelector(`[data-add="${p.id}"]`).onclick=()=>addToCart(p,qty);});}
q?.addEventListener('input',renderProducts);cat?.addEventListener('change',renderProducts);
function fmtDate(d){return d.replaceAll('-','');}function fmtTime(t){return t.replace(':','')+'00';}
function generateICS({title,desc,start,end}){const blob=new Blob(['BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:MultidiagnosticosAS\n','BEGIN:VEVENT\n',`UID:${Date.now()}@multidiagnosticosas\n`,`DTSTAMP:${start}\n`,`DTSTART:${start}\n`,`DTEND:${end}\n`,`SUMMARY:${title}\n`,`DESCRIPTION:${desc}\n`,'END:VEVENT\nEND:VCALENDAR'].join(''),{type:'text/calendar'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='cita-multidiagnosticos.ics';a.click();URL.revokeObjectURL(url);}
document.getElementById('btnICS').onclick=()=>{const s=document.getElementById('bService').value,d=document.getElementById('bDate').value,t=document.getElementById('bTime').value;if(!s||!d||!t){alert('Completa servicio, fecha y hora');return;}const start=fmtDate(d)+'T'+fmtTime(t);const endDate=new Date(`${d}T${t}:00`);endDate.setHours(endDate.getHours()+1);const end=fmtDate(endDate.toISOString().slice(0,10))+'T'+fmtTime(endDate.toTimeString().slice(0,5));generateICS({title:`${s} — Multidiagnósticos AS`,desc:'Recordatorio de cita',start,end});};
document.getElementById('bookForm').addEventListener('submit',(e)=>{e.preventDefault();const s=document.getElementById('bService').value,d=document.getElementById('bDate').value,t=document.getElementById('bTime').value,plate=document.getElementById('bPlate').value,model=document.getElementById('bModel').value,name=document.getElementById('bName').value,phone=document.getElementById('bPhone').value,notes=document.getElementById('bNotes').value;const text=`Hola, quiero agendar:%0A• Servicio: ${s}%0A• Fecha: ${d} ${t}%0A• Placa: ${plate}%0A• Modelo: ${model}%0A• Nombre: ${name}%0A• Tel: ${phone}%0A• Notas: ${notes}`;window.open(`https://wa.me/573003651525?text=${text}`,'_blank');});
document.getElementById('year').textContent=new Date().getFullYear();
loadProducts().then(()=>{renderProducts();persist();});
// ===============================
// MENÚ RESPONSIVE
// ===============================
const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');

if (btnMenu && menu) {
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
    const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
    btnMenu.setAttribute('aria-expanded', !expanded);
  });
}
