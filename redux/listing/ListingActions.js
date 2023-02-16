import { SET_LISTING, SET_AUCTION } from "./ListingConstants";
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
