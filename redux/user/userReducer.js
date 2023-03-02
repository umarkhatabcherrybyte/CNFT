import { SET_USER } from "./userConstants";
const INIT_STATE = {
  user_id: "",
};

export const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { user_id: action.payload };
    default:
      return state;
  }
};
