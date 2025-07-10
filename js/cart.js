function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function clearCart() {
  saveCart([]);
}
function updateCartCount() {
  document.getElementById('cart-count').textContent = getCart().length;
}
function formatCurrency(value) {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}
function renderCartItems() {
  const container = document.getElementById('cart-items');
  const cart = getCart();
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p>El carrito está vacío.</p>';
    document.getElementById('cart-actions').style.display = 'none';
    document.getElementById('cart-total').innerHTML = '';
    return;
  }
  cart.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="card-body">
        <h2>${item.title}</h2>
        <div class="price">${formatCurrency(item.price)}</div>
      </div>
    `;
    container.appendChild(card);
  });
}
function renderTotal() {
  const total = getCart().reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').innerHTML = `<p>Total: <strong>${formatCurrency(total)}</strong></p>`;
}
function setupButtons() {
  document.getElementById('empty-btn').addEventListener('click', () => {
    clearCart();
    renderCart();
    updateCartCount();
  });
  document.getElementById('checkout-btn').addEventListener('click', () => {
    clearCart();
    updateCartCount();
    window.location.href = 'index.html';
  });
}
function renderCart() {
  updateCartCount();
  renderCartItems();
  if (getCart().length > 0) {
    renderTotal();
    document.getElementById('cart-actions').style.display = 'flex';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupButtons();
});
