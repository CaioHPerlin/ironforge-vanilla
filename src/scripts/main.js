import './router';
import './toast';
import './cart';
import './auth';
import { showToast } from './toast';
import { getRole, logout, setRole } from './auth';

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === '`') {
    console.log('role update');
    getRole() ? logout() : setRole('user');
    updateViewForRole();
  }
});

const updateViewForRole = () => {
  const role = getRole();
  const userContent = document.querySelectorAll('.USER-ONLY');
  const anonContent = document.querySelectorAll('.ANON-ONLY');

  if (!role) {
    userContent.forEach((el) => el.classList.add('hidden'));
    anonContent.forEach((el) => el.classList.remove('hidden'));
  } else if (role) {
    anonContent.forEach((el) => el.classList.add('hidden'));
    userContent.forEach((el) => el.classList.remove('hidden'));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateViewForRole();

  const searchForm = document.querySelector('header form[aria-label="search"]');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.route('/pesquisar/produto-exemplo');
  });

  const checkoutButton = document.querySelector('#checkout-button');
  checkoutButton.addEventListener('click', () => {
    const role = getRole();

    if (!role) {
      showToast('Você precisa estar autenticado para finalizar a compra.', 'error');
      return;
    }

    window.route('/finalizar-compra');
  });
});
