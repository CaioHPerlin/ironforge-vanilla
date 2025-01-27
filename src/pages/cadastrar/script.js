import { isValidEmail, isValidName, isValidPassword } from '../../scripts/utils';
import { showToast } from '../../scripts/toast';

const showError = (element, condition) => {
  if (condition) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

const validateRegisterForm = () => {
  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  const nameError = document.getElementById('nameError');
  const surnameError = document.getElementById('surnameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  let isValid = true;

  // Validate name
  if (!isValidName(name)) {
    showError(nameError, true);
    isValid = false;
  } else {
    showError(nameError, false);
  }

  // Validate surname
  if (!isValidName(surname)) {
    showError(surnameError, true);
    isValid = false;
  } else {
    showError(surnameError, false);
  }

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

  // Validate confirm password
  if (password !== confirmPassword) {
    showError(confirmPasswordError, true);
    isValid = false;
  } else {
    showError(confirmPasswordError, false);
  }

  return { isValid, name, surname, email, password };
};

const handleRegister = ({ name, surname, email, password }) => {
  const existingEmails = ['usuario@exemplo.com'];

  if (existingEmails.includes(email)) {
    showToast('Este e-mail já está associado a uma conta.', 'error');
    return;
  }

  // Simulate delay for user feedback
  const submitButton = document.getElementById('submitButton');
  submitButton.textContent = 'Registrando...';

  setTimeout(() => {
    submitButton.textContent = 'Registrar';
    window.route('/');
    setRole('user');
    showToast(
      'Conta criada com sucesso! Verifique seu e-mail para validar seu cadastro.',
      'success',
    );
  }, 3000);
};

// Attach event listener to form
document.getElementById('signupForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const { isValid, ...formData } = validateRegisterForm();

  if (!isValid) {
    showToast('Por favor, corrija os erros no formulário.', 'error');
    return;
  }

  handleRegister(formData);
});
