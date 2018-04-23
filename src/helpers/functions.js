/**
 * Return the total discounted price.
 *
 * @param items
 * @param cart
 * @return {string}
 */
export const getTotal = ({ items, cart }) => {
  const total = items.reduce((prev, item) => {
    let sum = 0;
    let quantity = cart[item.id];

    if (quantity) {
      // Make a discount
      if (item.oneFreeEach) {
        quantity = quantity - Math.floor(quantity / item.oneFreeEach);
      }

      sum = item.discounted || item.price;
      sum = sum * quantity;
    }

    return prev + sum;
  }, 0);

  return total.toFixed(2);
};

/**
 * Return the total non-discounted price.
 *
 * @param items
 * @param cart
 * @return {string}
 */
export const getSubtotal = ({ items, cart }) => {
  const total = items.reduce((prev, item) => {
    let sum = 0;
    const quantity = cart[item.id];

    if (quantity) {
      sum = item.price;
      sum = sum * quantity;
    }

    return prev + sum;
  }, 0);

  return total.toFixed(2);
};
