const showToast = (message, type = 'success', duration = 4000) => {
  const toastContainer = document.querySelector('#toast-container');

  const toast = document.createElement('div');
  let color = 'bg-toast-success';
  let icon = 'bi-check';

  if (type === 'error') {
    color = 'bg-toast-error';
    icon = 'bi-x';
  }

  toast.innerHTML = `
        <div class="toast animate-fade-down ${color} rounded-lg border-1 border-offwhite flex flex-row items-center text-white px-2 py-1" role="alert">
            <i class="bi ${icon} text-4xl mr-2"></i>
            <span>${message}</span>
            <i class="bi bi-x text-lg px-2"></i>
        </div>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    removeToast(toast);
  }, duration);
};

const removeToast = (toast) => {
  toast.style.animation = 'var(--animate-fade-out-right)';

  toast.addEventListener('animationend', () => {
    toast.remove();
  });
};

document.addEventListener('click', (event) => {
  if (event.target.closest('.toast')) {
    const toast = event.target.closest('.toast');
    removeToast(toast);
  }
});

export { showToast };
