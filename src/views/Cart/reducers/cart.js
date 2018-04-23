import { CART_ADD, CART_REMOVE, CART_EMPTY } from "@/redux/types";

// We have two separate properties to keep
// the order and track the quantity.
const initialState = {
  quantities: {},
  ids: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    /**
     * Add an item to the cart.
     */
    case CART_ADD: {
      const quantity = state.quantities[action.id] || 0;
      let ids = state.ids;

      // This is to keep the order the user adds
      if (ids.indexOf(action.id) === -1) {
        ids = [...state.ids, action.id];
      }

      return {
        ids,
        quantities: {
          ...state.quantities,
          [action.id]: quantity + 1
        }
      };
    }

    /**
     * Decrease the quantity of an item from the cart. Remove if 0.
     */
    case CART_REMOVE: {
      const quantity = (state.quantities[action.id] || 1) - 1;
      let ids = state.ids;
      let quantities = { ...state.quantities };

      // Remove the item if the quantity is 0.
      if (quantity === 0) {
        const index = state.ids.indexOf(action.id);
        ids = [...state.ids];
        ids.splice(index, 1);
        delete quantities[action.id];
      } else {
        quantities[action.id] = quantity;
      }

      return { ids, quantities };
    }

    /**
     * Empty the cart.
     */
    case CART_EMPTY: {
      return {
        quantities: {},
        ids: []
      };
    }

    default:
      return state;
  }
};
