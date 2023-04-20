import { SET_USER } from "./userConstants";

export const setUser = (item) => {
  return {
    type: SET_USER,
    payload: item,
  };
};
