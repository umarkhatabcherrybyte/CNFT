import { combineReducers } from "redux";
import { listingreducer } from "../listing/ListingReducer";
import { userReducer } from "../user/userReducer";
import { walletreducer } from "../wallet/WalletReducer";
export const rootReducer = combineReducers({
  listing: listingreducer,
  user: userReducer,
  wallet: walletreducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;
