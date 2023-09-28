export const formatAmount = (amount) => {
  if (amount >= 1000 && amount < 1000000) {
    return (amount / 1000).toFixed(1) + "k";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + "m";
  } else {
    return amount.toFixed(2);
  }
};
export const formatDateFromTimestamp = (unixTimestamp) => {
  if (unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};
