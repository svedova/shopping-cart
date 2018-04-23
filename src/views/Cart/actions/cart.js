import { CART_ADD, CART_REMOVE, CART_EMPTY } from "@/redux/types";
import { LocalStorage } from "@svedova/storage";

export const addToCart = item => {
  return { type: CART_ADD, id: item.id };
};

export const removeFromCart = item => {
  return { type: CART_REMOVE, id: item.id };
};

export const emptyCart = () => {
  LocalStorage.del("cart");
  return { type: CART_EMPTY };
};
