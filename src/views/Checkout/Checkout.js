import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTotal } from "@/helpers/functions";
import { props } from "@/ui";
import { Summary } from "@/views/Cart/components";

const Empty = Styled.h3`
  text-align: center;
`;

const StyledLink = Styled(Link)`
  color: ${props.blue50};
`;

const StyledSummary = Styled(Summary)`
  position: static;
  top: auto;
  left: auto;
  margin: 0 auto;
  color: white;
`;

class CheckoutView extends PureComponent {
  static defaultProps = {
    items: [],
    cart: {
      quantities: {},
      ids: []
    }
  };

  static propTypes = {
    cart: PropTypes.object,
    items: PropTypes.array
  };

  getTotal = () => {
    const { cart, items } = this.props;
    return getTotal({ items, cart: cart });
  };

  render() {
    const total = this.getTotal();

    if (total === "0.00") {
      return (
        <Empty>
          You have nothing in your cart.{" "}
          <StyledLink to={"/"}>
            Go to home page to visit our products.
          </StyledLink>
        </Empty>
      );
    }

    return <StyledSummary action={<Link to="/payment">Payment</Link>} />;
  }
}

export const mapStateToProps = state => ({
  cart: state.cart.quantities,
  items: state.items.all
});

export default connect(mapStateToProps)(CheckoutView);
