const setRole = (role) => {
  localStorage.setItem('role', role);
};

const getRole = () => {
  return localStorage.getItem('role');
};

const logout = () => {
  localStorage.removeItem('role');
};
