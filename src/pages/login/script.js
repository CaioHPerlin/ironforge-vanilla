// Form validation
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('emailError');

  if (!isValidEmail(email)) {
    emailError.classList.remove('hidden');
    return;
  } else {
    emailError.classList.add('hidden');
  }

  if (email !== 'usuario@exemplo.com' || password !== '123123') {
    Toastify({
      text: 'E-mail ou senha incorretos.',
      duration: 3000,
      close: true,
      gravity: 'bottom',
      position: 'left',
      style: {
        background: '#D94958',
      },
    }).showToast();
    return;
  }

  Toastify({
    text: 'Usuário autenticado com sucesso!',
    duration: 3000,
    close: true,
    gravity: 'bottom',
    position: 'left',
    style: {
      background: '#34C759',
    },
  }).showToast();

  // Simulate delay
  document.getElementById('submitButton').textContent = 'Entrando...';
  setTimeout(() => {
    document.getElementById('submitButton').textContent = 'Entrar';
    window.location.href = '/signed/index.html';
  }, 5000);
});

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;

  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');

  if (atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1) {
    return true;
  }
  return false;
};
