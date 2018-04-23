/* global firebase */
import { LIST_FETCH_ITEMS } from "@/redux/types";

export const fetchItems = () => dispatch => {
  return firebase
    .firestore()
    .collection("items")
    .get()
    .then(results => {
      if (results) {
        const items = [];
        results.forEach(item => {
          const data = item.data();
          const { price, discount } = data;

          data.id = item.id;
          data.discounted = data.discount
            ? Math.round((price - price * discount / 100) * 100) / 100
            : undefined;

          items.push(data);
        });

        dispatch({ type: LIST_FETCH_ITEMS, items });
      }
    });
};
