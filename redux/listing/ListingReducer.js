import { SET_LISTING, SET_AUCTION } from "./ListingConstants";
const INIT_STATE = {
  data: {},
  auction: {},
};

export const listingreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_LISTING:
      // return {action.payload};
      return { data: action.payload };
    // return { ...state, products: action.payload };
    case SET_AUCTION:
      return { auction: action.payload };

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
        console.log([...state.data, dltiteams]);

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
