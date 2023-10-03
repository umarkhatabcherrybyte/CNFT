import { SET_ASSETS } from "./AssetsConstants";
const INIT_STATE = {
  isLoading: false,
  contract_assets: [],
};

export const assetreducer = (state = INIT_STATE, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case SET_ASSETS:
      return { contract_assets: action.payload };

    default:
      return state;
  }
};
