import { showToast } from '../../../scripts/toast';

// State Selector
const states = [
  ['AC', 'Acre'],
  ['AL', 'Alagoas'],
  ['AP', 'Amapá'],
  ['AM', 'Amazonas'],
  ['BA', 'Bahia'],
  ['CE', 'Ceará'],
  ['DF', 'Distrito Federal'],
  ['ES', 'Espirito Santo'],
  ['GO', 'Goiás'],
  ['MA', 'Maranhão'],
  ['MS', 'Mato Grosso do Sul'],
  ['MT', 'Mato Grosso'],
  ['MG', 'Minas Gerais'],
  ['PA', 'Pará'],
  ['PB', 'Paraíba'],
  ['PR', 'Paraná'],
  ['PE', 'Pernambuco'],
  ['PI', 'Piauí'],
  ['RJ', 'Rio de Janeiro'],
  ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'],
  ['RO', 'Rondônia'],
  ['RR', 'Roraima'],
  ['SC', 'Santa Catarina'],
  ['SP', 'São Paulo'],
  ['SE', 'Sergipe'],
  ['TO', 'Tocantins'],
];

const stateSelector = document.querySelector('#state');

const populateStates = () => {
  states.forEach(([abbreviation, name]) => {
    const option = document.createElement('option');
    option.value = abbreviation;
    option.textContent = name;
    stateSelector.appendChild(option);
  });
};

// Cart
const checkoutProductsContainer = document.querySelector('#checkout-products');
const priceTotalContainer = document.querySelector('#price-total');

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

const updateCheckout = () => {
  const cart = getCart();
  checkoutProductsContainer.innerHTML = ''; // Clear previous items
  let totalPrice = 0;

  if (cart.length === 0) {
    checkoutProductsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    priceTotalContainer.textContent = 'R$ 0.00';
    return;
  }

  cart.forEach((product) => {
    // Calculate total price including product price and shipping
    const productTotal = product.price + 0.01;
    totalPrice += productTotal;

    // Create product element
    const productElement = document.createElement('div');
    productElement.className = 'flex flex-row';
    productElement.innerHTML = `
      <img
        src="${product.image || '/placeholder.png'}"
        class="w-1/6 aspect-square border-1 border-primary"
        alt="${product.name}"
      />
      <div class="flex w-full flex-col pl-4">
        <div class="flex flex-row justify-between w-full">
          <h1 class="text-2xl font-semibold">${product.name}</h1>
          <h2 class="text-2xl font-semibold">R$ ${product.price.toFixed(2)}</h2>
        </div>
        <div class="flex flex-row justify-between w-full pb-1 border-b-1 border-black">
          <span class="text-xl font-light">Transportadora X</span>
          <span class="text-xl font-light">R$ 0.01</span>
        </div>
        <span class="text-2xl self-end font-semibold">R$ ${productTotal.toFixed(2)}</span>
      </div>
    `;
    checkoutProductsContainer.appendChild(productElement);
  });

  // Update the total price
  priceTotalContainer.textContent = `R$ ${totalPrice.toFixed(2)}`;
};

// Form validation
const showError = (element, condition) => {
  if (condition) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};

const validateAddressForm = () => {
  const zip = document.getElementById('zip').value.trim();
  const street = document.getElementById('street').value.trim();
  const state = document.getElementById('state').value.trim();
  const city = document.getElementById('city').value.trim();
  const number = document.getElementById('number').value.trim();
  const neighborhood = document.getElementById('neighborhood').value.trim();
  const complement = document.getElementById('complement').value.trim();

  const zipError = document.getElementById('zipError');
  const streetError = document.getElementById('streetError');
  const stateError = document.getElementById('stateError');
  const cityError = document.getElementById('cityError');
  const numberError = document.getElementById('numberError');
  const neighborhoodError = document.getElementById('neighborhoodError');

  let isValid = true;

  // Validate zip
  const zipPattern = /^\d{5}-\d{3}$/;
  if (!zipPattern.test(zip)) {
    showError(zipError, true);
    isValid = false;
  } else {
    showError(zipError, false);
  }

  // Validate street
  if (street.length < 4) {
    showError(streetError, true);
    isValid = false;
  } else {
    showError(streetError, false);
  }

  // Validate state
  if (!state) {
    showError(stateError, true);
    isValid = false;
  } else {
    showError(stateError, false);
  }

  // Validate city
  if (city.length < 4) {
    showError(cityError, true);
    isValid = false;
  } else {
    showError(cityError, false);
  }

  // Validate number
  if (number.length === 0 || isNaN(number)) {
    showError(numberError, true);
    isValid = false;
  } else {
    showError(numberError, false);
  }

  // Validate neighborhood
  if (neighborhood.length === 0) {
    showError(neighborhoodError, true);
    isValid = false;
  } else {
    showError(neighborhoodError, false);
  }

  return { isValid, zip, street, state, city, number, neighborhood, complement };
};

const handleAddressSubmit = ({ zip, street, state, city, number, neighborhood, complement }) => {
  // Simulate delay for user feedback
  const submitButton = document.getElementById('checkout-button');
  submitButton.textContent = 'Processando...';

  setTimeout(() => {
    submitButton.textContent = 'Próximo';
    showToast('Endereço registrado com sucesso!', 'success');
    window.route('/finalizar/2');
  }, 3000);
};

// Attach event listener to form
document.getElementById('addressForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const { isValid, ...formData } = validateAddressForm();

  if (!isValid) {
    showToast('Por favor, corrija os erros no formulário.', 'error');
    return;
  }

  handleAddressSubmit(formData);
});

// CEP mask
const applyCepMask = (value) => {
  return value
    .replace(/\D/g, '') // Remove non-numeric characters
    .replace(/(\d{5})(\d)/, '$1-$2') // Add hyphen after the first 5 digits
    .slice(0, 9); // Limit to 9 characters
};

document.getElementById('zip').addEventListener('input', (event) => {
  event.target.value = applyCepMask(event.target.value);
});

// Misc.
document.querySelector('#tags').addEventListener('click', (event) => {
  window.route('/produtos');
});

populateStates();
updateCheckout();
