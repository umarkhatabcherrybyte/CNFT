import { SET_INSTANCE } from "./WalletConstants";
export const setInstance = (item) => {
  return {
    type: SET_INSTANCE,
    payload: item,
  };
};
