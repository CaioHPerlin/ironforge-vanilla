import { addProductToCart, openCart } from '../../../scripts/cart';
import { showToast } from '../../../scripts/toast';

document.querySelector('#add-to-cart').addEventListener('click', () => {
  const product = {
    name: 'Produto #000',
    price: 9.99,
  };

  addProductToCart(product);
  openCart();

  showToast('Produto #000 adicionado ao carrinho.', 'success');
});
