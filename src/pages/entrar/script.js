import { isValidEmail, isValidPassword } from '../../scripts/utils';
import { showToast } from '../../scripts/toast';
import { setRole } from '../../scripts/auth';

const showError = (element, condition) => {
  if (condition) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

const validateForm = () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  let isValid = true;

  // Validate email
  if (!isValidEmail(email)) {
    showError(emailError, true);
    isValid = false;
  } else {
    showError(emailError, false);
  }

  // Validate password
  if (!isValidPassword(password)) {
    showError(passwordError, true);
    isValid = false;
  } else {
    showError(passwordError, false);
  }

  return { isValid, email, password };
};

const handleLogin = (email, password) => {
  if (email !== 'usuario@exemplo.com') {
    showToast('E-mail não existe no sistema.', 'error');
    return;
  }

  if (password !== '123123') {
    showToast('Senha incorreta.', 'error');
    return;
  }

  // Simulate delay for user feedback
  const submitButton = document.getElementById('submitButton');
  submitButton.textContent = 'Entrando...';

  setTimeout(() => {
    submitButton.textContent = 'Entrar';
    window.route('/');
    setRole('user');
    showToast('Login efetuado com sucesso!', 'success');
  }, 3000);
};

// Attach event listener to form
document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const { isValid, email, password } = validateForm();

  if (!isValid) {
    showToast('Por favor, corrija os erros no formulário.', 'error');
    return;
  }

  handleLogin(email, password);
});
