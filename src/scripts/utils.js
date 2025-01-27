const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;

  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');

  if (atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1) {
    return true;
  }
  return false;
};

const isValidPassword = (password) => {
  if (typeof password !== 'string') return false;

  if (password.length < 6) {
    return false;
  }

  return true;
};

const hasNumbers = (str) => {
  for (let char of str) {
    if (!isNaN(parseInt(char))) {
      return true; // Return true if a number is found
    }
  }
  return false; // Return false if no numbers are found
};

const isValidName = (name) => {
  if (typeof name !== 'string') return false;

  if (name.length < 2) {
    return false;
  }

  if (hasNumbers(name)) {
    return false;
  }

  return true;
};

export { isValidEmail, isValidPassword, isValidName };
