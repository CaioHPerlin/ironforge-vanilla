const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

const hasNumbers = (str) => {
  for (let char of str) {
    if (!isNaN(parseInt(char))) {
      return true;
    }
  }
  return false;
};

const isValidName = (name) => {
  if (typeof name !== 'string') return false;
  if (name.length < 2) return false;
  if (hasNumbers(name)) return false;
  return true;
};

const isValidInstallments = (installments) => {
  return !!installments;
};

const isValidCPF = (cpf) => {
  if (typeof cpf !== 'string') return false;
  if (cpf.length !== 14) return false;
  for (let i = 0; i < cpf.length; i++) {
    if (i === 3 || i === 7) {
      if (cpf[i] !== '.') return false;
    } else if (i === 11) {
      if (cpf[i] !== '-') return false;
    } else {
      if (isNaN(parseInt(cpf[i]))) return false;
    }
  }
  return true;
};

const isValidCardNumber = (cardNumber) => {
  if (typeof cardNumber !== 'string') return false;

  if (cardNumber.length < 12) return false;

  return true;
};

const isValidCardName = (cardName) => {
  return typeof cardName === 'string' && cardName.length >= 4;
};

const isValidCardExpiry = (cardExpiry) => {
  if (typeof cardExpiry !== 'string') return false;
  if (cardExpiry.length !== 5) return false;
  if (cardExpiry[2] !== '/') return false;

  const month = parseInt(cardExpiry.slice(0, 2));
  const year = parseInt(cardExpiry.slice(3, 5));

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    return false;
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

const isValidCardCVC = (cardCVC) => {
  if (typeof cardCVC !== 'string') return false;
  if (cardCVC.length !== 3) return false;

  return true;
};

export {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidInstallments,
  isValidCPF,
  isValidCardNumber,
  isValidCardName,
  isValidCardExpiry,
  isValidCardCVC,
};
