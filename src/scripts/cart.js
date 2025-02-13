if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

const updateCartProducts = () => {
  const cart = getCart();
  cartProductsContainer.innerHTML = ''; // Clear previous items
  if (cart.length === 0) {
    cartProductsContainer.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
    updateCartTotal(); // Update total to 0
    updateCartQuantity(); // Update cart quantity
    return;
  }

  cart.forEach((product, index) => {
    const productElement = document.createElement('div');
    productElement.className = 'flex-row flex h-[100px] gap-4';
    productElement.innerHTML = `
        <img src="${product.image || '/placeholder.png'}" alt="${
      product.name
    }" class="border-1 border-primary" />
        <div class="flex flex-col gap-2 w-full">
          <div class="flex flex-row justify-between w-full">
            <h1 class="text-2xl font-semibold">${product.name}</h1>
            <div class="remove-btn cursor-pointer" data-index="${index}">
              <i class="text-2xl bi bi-trash"></i>
            </div>
          </div>
          <h2 class="text-2xl font-semibold">R$ ${product.price.toFixed(2)}</h2>
        </div>
      `;
    cartProductsContainer.appendChild(productElement);
  });

  document.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = parseInt(event.target.closest('.remove-btn').dataset.index, 10);
      removeProductFromCart(index);
      updateCartProducts(); // Refresh cart display
    });
  });

  updateCartTotal(); // Update total whenever cart is updated
  updateCartQuantity(); // Update cart quantity
};

const updateCartTotal = () => {
  cartTotalContainer.textContent = `R$ ${getCartTotal().toFixed(2)}`;
};

const updateCartQuantity = () => {
  const cart = getCart();
  const quantity = cart.length;

  if (quantity > 0) {
    cartQuantityContainer.classList.remove('hidden');
  } else {
    cartQuantityContainer.classList.add('hidden');
  }
  cartQuantityContainer.textContent = quantity > 0 ? quantity : '';
};

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((sum, product) => sum + product.price, 0);
};

const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
  updateCartProducts();
};

const addProductToCart = (product) => {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartProducts();
};

const removeProductFromCart = (index) => {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartProducts();
  }
};

const cartContainer = document.querySelector('#cart-container');
const cartProductsContainer = document.querySelector('#cart-products-container');
const cartQuantityContainer = document.querySelector('#cart-quantity-container');
const cartTotalContainer = document.querySelector('#cart-total-container');

const closeCart = () => {
  cartContainer.classList.add('hidden');
};

const openCart = () => {
  updateCartProducts(); // Refresh cart contents
  cartContainer.classList.remove('hidden');
};

document.addEventListener('click', (event) => {
  if (event.target.closest('[aria-label="close-cart"]')) {
    closeCart();
  }

  if (event.target.closest('[aria-label="cart"]')) {
    openCart();
  }
});

export {
  getCart,
  clearCart,
  getCartTotal,
  addProductToCart,
  removeProductFromCart,
  openCart,
  closeCart,
};
updateCartQuantity();
