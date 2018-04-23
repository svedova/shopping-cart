import { combineReducers } from "redux";
import list from "@/views/List/reducers";
import cart from "@/views/Cart/reducers";

export default combineReducers({
  ...list,
  ...cart
});
