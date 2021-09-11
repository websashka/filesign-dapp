export const saveCurrentUser = (address) => {
  if (!address) {
    return;
  }

  localStorage.setItem('userAddress', address);
};

export const forgetCurrentUser = () => {
  localStorage.removeItem('userAddress');
};

export const getCurrentUserAddress = () => localStorage.getItem('userAddress');
