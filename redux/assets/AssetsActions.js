import { SET_ASSETS } from "./AssetsConstants";

export const setAssets = (item) => {
  return {
    type: SET_ASSETS,
    payload: item,
  };
};
