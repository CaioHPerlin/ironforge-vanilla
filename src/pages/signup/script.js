document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const emailError = document.getElementById('emailError');
  const nameError = document.getElementById('nameError');
  const surnameError = document.getElementById('surnameError');
  const passwordError = document.getElementById('passwordError');

  const showError = (element, message = '') => {
    element.textContent = message;
    element.classList.remove('hidden');
  };

  const hideError = (element) => {
    element.classList.add('hidden');
    element.textContent = '';
  };

  let isValid = true;

  if (name.length < 2) {
    showError(nameError, 'Nome é um campo obrigatório.');
    isValid = false;
  } else {
    hideError(nameError);
  }

  if (surname.length < 2) {
    showError(surnameError, 'Sobrenome é um campo obrigatório.');
    isValid = false;
  } else {
    hideError(surnameError);
  }

  if (password.length < 6 || !password) {
    showError(passwordError, 'A senha deve ter, no mínimo, 6 caracteres.');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError(passwordError, 'As senhas não coincidem.');
    isValid = false;
  } else {
    hideError(passwordError);
  }

  if (!isValidEmail(email)) {
    showError(emailError, 'E-mail inválido.');
    isValid = false;
  } else {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      showError(emailError, 'Este e-mail já está associado à uma conta.');
      isValid = false;
    } else {
      hideError(emailError);
    }
  }

  if (!isValid) return;

  Toastify({
    text: 'Conta criada com sucesso! Verifique seu e-mail para validar seu cadastro.',
    duration: 3000,
    close: true,
    gravity: 'bottom',
    position: 'left',
    style: { background: '#34C759' },
  }).showToast();

  const submitButton = document.getElementById('submitButton');
  submitButton.textContent = 'Criando...';
  setTimeout(() => {
    submitButton.textContent = 'Criar Conta';
    window.location.href = '/signed/index.html';
  }, 5000);
});

const isValidEmail = (email) => {
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

const checkEmailExists = async (email) => {
  const existingEmails = ['usuario@exemplo.com'];
  return new Promise((resolve) => {
    setTimeout(() => resolve(existingEmails.includes(email)), 500);
  });
};
