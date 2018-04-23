import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTotal } from "@/helpers/functions";
import { Span } from "@/ui";
import { connect } from "react-redux";
import { Cart, Total } from "./components";

const Icon = Span.extend`
  cursor: pointer;
  user-select: none;
`;

export class CartView extends PureComponent {
  static defaultProps = {
    items: []
  };

  static propTypes = {
    cart: PropTypes.object,
    items: PropTypes.array
  };

  getTotal = () => {
    const { cart, items } = this.props;
    return getTotal({ cart, items });
  };

  render() {
    const { cart } = this.props;
    const hasItems = Object.keys(cart).length > 0;
    const total = this.getTotal();

    return (
      <Cart>
        <Link to="/checkout">
          {hasItems && <Total>CHF {total}</Total>}
          <Icon className="fas fa-shopping-cart" />
        </Link>
      </Cart>
    );
  }
}

export const mapStateToprops = state => ({
  cart: state.cart.quantities,
  items: state.items.all
});

export default connect(mapStateToprops)(CartView);
