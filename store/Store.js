import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "/redux/reducers/index";
import { createWrapper } from "next-redux-wrapper";
// import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../redux/reducers";

const initalState = {};
let composeEnhancers = compose;
if (typeof window !== "undefined") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const middleware = [thunk];
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
