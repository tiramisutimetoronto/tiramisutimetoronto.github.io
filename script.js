document.addEventListener('DOMContentLoaded', function () {
  feather.replace();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const cart = [];
  const cartCountEl = document.getElementById('cart-count');
  const cartButton = document.getElementById('cart-button');

  // Shopify-ready config (fill when account is ready)
  const SHOPIFY = {
    enabled: false,
    storeDomain: '', // e.g. your-store.myshopify.com
    cartPath: '/cart',
  };

  function updateCartCount() {
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = String(total);
  }

  function notify(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition', 'duration-500');
      setTimeout(() => notification.remove(), 500);
    }, 2200);
  }

  function buildShopifyPermalink() {
    const lines = cart
      .filter(i => i.variantId)
      .map(i => `${i.variantId}:${i.qty}`)
      .join(',');

    if (!lines || !SHOPIFY.storeDomain) return null;
    return `https://${SHOPIFY.storeDomain}${SHOPIFY.cartPath}/${lines}`;
  }

  function openCart() {
    if (SHOPIFY.enabled) {
      const url = buildShopifyPermalink();
      if (url) {
        window.open(url, '_blank');
        return;
      }
      notify('Shopify is enabled, but variant IDs are missing.');
      return;
    }

    if (!cart.length) {
      notify('Cart is empty.');
      return;
    }

    const summary = cart.map(i => `${i.name} x${i.qty}`).join('\n');
    alert(`Cart preview:\n\n${summary}\n\n(Shopify connection pending)`);
  }

  document.querySelectorAll('.cart-controls').forEach(control => {
    const qtyInput = control.querySelector('.qty-input');

    control.addEventListener('click', (e) => {
      const btn = e.target.closest('.qty-btn, .add-to-cart-btn');
      if (!btn) return;

      if (btn.classList.contains('qty-btn')) {
        const current = Math.max(1, parseInt(qtyInput.value || '1', 10));
        qtyInput.value = btn.dataset.action === 'increase' ? current + 1 : Math.max(1, current - 1);
        return;
      }

      if (btn.classList.contains('add-to-cart-btn')) {
        const qty = Math.max(1, parseInt(qtyInput.value || '1', 10));
        const name = control.dataset.product;
        const price = Number(control.dataset.price || 0);
        const variantId = control.dataset.variantId || '';

        const existing = cart.find(i => i.name === name);
        if (existing) {
          existing.qty += qty;
        } else {
          cart.push({ name, price, qty, variantId });
        }

        updateCartCount();
        notify(`Added ${qty} × ${name}`);
      }
    });
  });

  if (cartButton) {
    cartButton.addEventListener('click', openCart);
  }

  updateCartCount();
});
