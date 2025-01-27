localStorage.setItem('cart', JSON.stringify([]));

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart'));
};

const addProductToCart = () => {
  const cart = getCart();
  cart.push({ id: 1, name: 'Product 1' });
  localStorage.setItem('cart', JSON.stringify(cart));
};

const removeProductFromCart = (index) => {
  const cart = getCart();

  if (!index) {
    index = cart.length - 1;
  }

  cart.pop(index);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export { getCart, addProductToCart, removeProductFromCart };
