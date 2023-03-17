export const formatAmount = (amount) => {
  if (amount >= 1000 && amount < 1000000) {
    return (amount / 1000).toFixed(1) + "k";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + "m";
  } else {
    return amount.toFixed(2);
  }
};
