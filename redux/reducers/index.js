import { combineReducers } from "redux";
import nftReducer from "./nfts";
import hotCollectionsReducer from "./hotCollections";
import authorListReducer from "./authorList";
import filterReducer from "./filters";
import blogPostsReducer from "./blogs";
import { listingreducer } from "../listing/ListingReducer";
import { userReducer } from "../user/userReducer";
import { walletreducer } from "../wallet/WalletReducer";
export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  filters: filterReducer,
  blogs: blogPostsReducer,
  listing: listingreducer,
  user: userReducer,
  wallet: walletreducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;
