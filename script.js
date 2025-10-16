document.getElementById("year").textContent = new Date().getFullYear();

// Mostrar productos
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = p.image || getBrandImage(p);
      img.alt = p.name;
      img.onerror = () => { img.src = getBrandImage(p); };
      const title = document.createElement("h4");
      title.textContent = p.name;
      const price = document.createElement("p");
      price.textContent = `$${p.price.toLocaleString("es-CO")}`;
      card.append(img, title, price);
      grid.append(card);
    });
  });

function getBrandImage(p) {
  const n = (p.brand || p.name || "").toUpperCase();
  if (n.includes("TUDOR")) return "assets/baterias/tudor-default.jpg";
  if (n.includes("BOSCH")) return "assets/baterias/bosch-default.jpg";
  return "assets/baterias/generico-bateria.jpg";
}
