import { SET_INSTANCE } from "./WalletConstants";
const INIT_STATE = {
  instance: {},
};

export const walletreducer = (state = INIT_STATE, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case SET_INSTANCE:
      return { instance: action.payload };
    default:
      return state;
  }
};
