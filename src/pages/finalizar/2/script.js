import { showToast } from '../../../scripts/toast';
import { getCart, clearCart } from '../../../scripts/cart';
import {
  isValidCardCVC,
  isValidCardExpiry,
  isValidCardNumber,
  isValidCPF,
} from '../../../scripts/utils';

// DOM Elements
const checkoutProductsContainer = document.querySelector('#checkout-products');
const priceTotalContainer = document.querySelector('#price-total');
const installmentsSelect = document.querySelector('#installments');
const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const creditCardFields = document.getElementById('creditCardFields');
const boletoFields = document.getElementById('boletoFields');
const installmentsField = document.getElementById('installmentsField');
const addressForm = document.getElementById('addressForm');
const checkoutButton = document.getElementById('checkout-button');
const formErrors = {
  installments: document.getElementById('installmentsError'),
  boletoName: document.getElementById('boletoNameError'),
  boletoCPF: document.getElementById('boletoCPFError'),
  cardCPF: document.getElementById('cardCPFError'),
  cardNumber: document.getElementById('cardNumberError'),
  cardName: document.getElementById('cardNameError'),
  cardExpiry: document.getElementById('cardExpiryError'),
  cardCVC: document.getElementById('cardCVCError'),
};

// Update Checkout Display
const updateCheckout = () => {
  const cart = getCart();
  checkoutProductsContainer.innerHTML = '';
  let totalPrice = 0;

  if (!cart.length) {
    checkoutProductsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    priceTotalContainer.textContent = 'R$ 0.00';
    updateInstallments(0);
    return;
  }

  cart.forEach((product) => {
    const productTotal = product.price + 0.01;
    totalPrice += productTotal;

    checkoutProductsContainer.innerHTML += `
      <div class="flex flex-row">
        <img
          src="${product.image || '/placeholder.png'}"
          class="w-1/6 aspect-square border-1 border-primary"
          alt="${product.name}"
        />
        <div class="flex w-full flex-col pl-4">
          <div class="flex justify-between">
            <h1 class="text-2xl font-semibold">${product.name}</h1>
            <h2 class="text-2xl font-semibold">R$ ${product.price.toFixed(2)}</h2>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span class="text-xl">Transportadora X</span>
            <span class="text-xl">R$ 0.01</span>
          </div>
          <span class="text-2xl font-semibold">R$ ${productTotal.toFixed(2)}</span>
        </div>
      </div>`;
  });

  priceTotalContainer.textContent = `R$ ${totalPrice.toFixed(2)}`;
  updateInstallments(totalPrice);
};

// Update Installment Options
const updateInstallments = (totalPrice) => {
  installmentsSelect.innerHTML = '';

  if (!totalPrice) {
    installmentsSelect.innerHTML = '<option value="one-time">1x de R$0.00</option>';
    return;
  }

  const maxInstallments = 4;
  Array.from({ length: maxInstallments }, (_, i) => i + 1).forEach((i) => {
    const installmentValue = (totalPrice / i).toFixed(2);
    installmentsSelect.innerHTML += `<option value="${i}-installments">${i}x de R$${installmentValue}</option>`;
  });
};

// Show/Hide Fields Based on Payment Method
const toggleFields = (method) => {
  const isBoleto = method === 'boleto';
  const isCreditCard = method === 'creditCard';

  boletoFields.classList.toggle('hidden', !isBoleto);
  creditCardFields.classList.toggle('hidden', !isCreditCard);
  installmentsField.classList.toggle('hidden', method === 'pix');
};

// Validate Form
const validateForm = () => {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || '';
  const boletoCPF = document.getElementById('boletoCPF').value.trim();
  const boletoName = document.getElementById('boletoName').value.trim();
  const cardCPF = document.getElementById('cardCPF').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const cardName = document.getElementById('cardName').value.trim();
  const cardExpiry = document.getElementById('cardExpiry').value.trim();
  const cardCVC = document.getElementById('cardCVC').value.trim();

  const errors = {
    installments: !installmentsSelect.value,
    boletoName: paymentMethod === 'boleto' && boletoName.length < 3,
    boletoCPF: paymentMethod === 'boleto' && !isValidCPF(boletoCPF),
    cardCPF: paymentMethod === 'creditCard' && !isValidCPF(cardCPF),
    cardNumber: paymentMethod === 'creditCard' && !isValidCardNumber(cardNumber),
    cardName: paymentMethod === 'creditCard' && cardName.length < 4,
    cardExpiry: paymentMethod === 'creditCard' && !isValidCardExpiry(cardExpiry),
    cardCVC: paymentMethod === 'creditCard' && !isValidCardCVC(cardCVC),
  };

  Object.entries(errors).forEach(([key, hasError]) => {
    formErrors[key]?.classList.toggle('hidden', !hasError);
  });

  const isValid = !Object.values(errors).some(Boolean);
  return { isValid, paymentMethod, boletoCPF, cardCPF, cardNumber, cardName, cardExpiry, cardCVC };
};

// Form Submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  const { isValid, ...formData } = validateForm();

  if (!isValid) {
    showToast('Por favor, corrija os erros no formulário.', 'error');
    return;
  }

  checkoutButton.textContent = 'Processando...';
  setTimeout(() => {
    checkoutButton.textContent = 'Próximo';
    showToast('Pagamento processado com sucesso!', 'success');
    clearCart();
    window.route('/finalizar/3');
  }, 3000);
};

// Event Listeners
addressForm.addEventListener('submit', handleFormSubmit);

paymentMethodRadios.forEach((radio) =>
  radio.addEventListener('change', (e) => toggleFields(e.target.value)),
);

// Input Masks
const onlyDigits = (value) =>
  value
    .split('')
    .filter((char) => char >= '0' && char <= '9')
    .join('');

const maskCVC = (value) => onlyDigits(value).slice(0, 4);

const maskExpiry = (value) => {
  const digits = onlyDigits(value);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2, 4);
};

const maskCPF = (value) => {
  const digits = onlyDigits(value);
  let result = '';
  for (let i = 0; i < digits.length && i < 11; i++) {
    if (i === 3 || i === 6) result += '.';
    if (i === 9) result += '-';
    result += digits[i];
  }
  return result;
};

document.getElementById('cardCVC').addEventListener('input', (e) => {
  e.target.value = maskCVC(e.target.value);
});

document.getElementById('cardExpiry').addEventListener('input', (e) => {
  e.target.value = maskExpiry(e.target.value);
});

document.getElementById('cardCPF').addEventListener('input', (e) => {
  e.target.value = maskCPF(e.target.value);
});

document.getElementById('boletoCPF').addEventListener('input', (e) => {
  e.target.value = maskCPF(e.target.value);
});

// Initialize
updateCheckout();
