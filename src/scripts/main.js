import './router';
import './toast';
import { getRole, logout, setRole } from './auth';

document.addEventListener('DOMContentLoaded', () => {
  updateViewForRole();
});

document.addEventListener('keypress', (e) => {
  if (e.key === 'r') {
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
