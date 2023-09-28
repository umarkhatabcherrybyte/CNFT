export const getObjData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};
export const getKeyData = (key) => {
  const data = localStorage.getItem(key);
  return data ? data : "";
};
