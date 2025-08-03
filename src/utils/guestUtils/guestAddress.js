export const saveGuestAddress = (address) => {
  localStorage.setItem("guestAddress", JSON.stringify(address));
};

export const getGuestAddress = () => {
  const address = localStorage.getItem("guestAddress");
  return address ? JSON.parse(address) : null;
};
