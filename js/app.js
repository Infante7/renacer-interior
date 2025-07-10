const services = [
  { id: 1, title: 'Lectura de Registros Akáshicos', description: 'Explora el origen de tus bloqueos emocionales: recibe mensajes canalizados que revelan heridas de infancia y guían tu sanación profunda.', price: 80000, thumbnail: 'imgs/akashic.png' },
  { id: 2, title: 'Visualización Guiada', description: 'Conecta con tu niña interior a través de meditaciones dirigidas: activa recursos internos y fortalece tu autoestima desde el amor.', price: 60000, thumbnail: 'imgs/guided-visualization.png' },
  { id: 3, title: 'Canalización Intuitiva & Oráculos', description: 'Recibe orientación personalizada mediante oráculos, ejercicios simbólicos y canalización, para empoderar tu voz interior y tomar acción.', price: 70000, thumbnail: 'imgs/intuitive-channeling.png' }
];

async function fetchProducts() {
  return services;
}

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  document.getElementById('cart-count').textContent = getCart().length;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" />
    <div class="card-body">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <div class="price">$${product.price.toLocaleString('es-AR')}</div>
      <button class="btn" aria-label="Añadir ${product.title} al carrito">Añadir al carrito</button>
    </div>
  `;
  const btn = card.querySelector('.btn');
  btn.addEventListener('click', () => {
    const cart = getCart();
    cart.push({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail });
    saveCart(cart);
    updateCartCount();
    const toast = document.getElementById('toast');
    toast.textContent = `${product.title} añadido al carrito ✓`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
  });
  return card;
}

async function init() {
  updateCartCount();
  const container = document.getElementById('products-container');
  const products = await fetchProducts();
  if (!products.length) {
    container.innerHTML = '<p>No se encontraron servicios.</p>';
    return;
  }
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', init);
