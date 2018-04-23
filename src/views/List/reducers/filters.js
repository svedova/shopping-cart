import { FILTER_RESET, FILTER_SET } from "@/redux/types";

const initialState = {
  sort: null,
  brand: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_RESET: {
      return {
        sort: null,
        brand: null
      };
    }

    case FILTER_SET: {
      return {
        ...state,
        [action.name]: action.value
      };
    }

    default:
      return state;
  }
};
