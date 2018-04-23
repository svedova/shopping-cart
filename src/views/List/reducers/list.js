import { LIST_FETCH_ITEMS } from "@/redux/types";

const initialState = {
  fetched: false,
  all: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_FETCH_ITEMS:
      return {
        all: action.items,
        fetched: true
      };

    default:
      return state;
  }
};
