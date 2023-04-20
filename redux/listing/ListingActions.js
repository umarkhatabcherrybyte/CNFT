import { SET_LISTING, SET_AUCTION, SET_STEP } from "./ListingConstants";
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};
export const setListing = (item) => {
  return {
    type: SET_LISTING,
    payload: item,
  };
};
export const setAuction = (item) => {
  return {
    type: SET_AUCTION,
    payload: item,
  };
};
export const setStep = (item) => {
  return {
    type: SET_STEP,
    payload: item,
  };
};

// remove iteams
export const DLT = (id) => {
  return {
    type: "RMV_CART",
    payload: id,
  };
};

// remove individual iteam

export const REMOVE = (iteam) => {
  return {
    type: "RMV_ONE",
    payload: iteam,
  };
};
