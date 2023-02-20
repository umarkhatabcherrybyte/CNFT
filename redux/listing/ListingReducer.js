import { SET_LISTING, SET_AUCTION, SET_STEP } from "./ListingConstants";
const INIT_STATE = {
  data: {},
  auction: {},
  step: "step1",
};

export const listingreducer = (state = INIT_STATE, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case SET_STEP:
      return { step: action.payload };
    case SET_LISTING:
      const stored = localStorage.getItem("listing");
      return { data: stored ? JSON.parse(stored) : {} };

    case SET_AUCTION:
      const stored_two = localStorage.getItem("auction");
      return stored_two ? JSON.parse(stored_two) : {};
    case "ADD_CART":
      const IteamIndex = state.data.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (IteamIndex >= 0) {
        state.data[IteamIndex].qnty += 1;
        return {
          ...state,
          data: [...state.data],
        };
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          data: [...state.data, temp],
        };
      }

    case "RMV_CART":
      const data = state.data.filter((el) => el.id !== action.payload);
      // console.log(data);

      return {
        ...state,
        data: data,
      };

    case "RMV_ONE":
      const IteamIndex_dec = state.data.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (state.data[IteamIndex_dec].qnty >= 1) {
        const dltiteams = (state.data[IteamIndex_dec].qnty -= 1);
        // console.log([...state.data, dltiteams]);

        return {
          ...state,
          data: [...state.data],
        };
      } else if (state.data[IteamIndex_dec].qnty === 1) {
        const data = state.data.filter((el) => el.id !== action.payload);

        return {
          ...state,
          data: data,
        };
      }

    default:
      return state;
  }
};
