import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { connect } from "react-redux";
import { props } from "@/ui";
import { removeFromCart } from "../actions/cart";
import { getTotal, getSubtotal } from "@/helpers/functions";

const StyledSummary = Styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  background: black;
  padding: ${props.paddingM};
  box-shadow: ${props.shadowM};
  text-align: left;
  z-index: 999;
`;

const Row = Styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props.marginL};
  border-top: ${p => (p.withBorderTop ? `1px solid ${props.gray50}` : "")};
  padding-top: ${p => (p.withBorderTop ? props.paddingL : 0)};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Col = Styled.div`
  flex: 1 1 auto;
  
  &:first-child {
    width: 69.6%;
  }
  
  &:last-child {
    max-width: 33px;
    align-self: flex-end;
    text-align: right;
  }
`;

const Quantity = Styled.span`
  display: inline-block;
  color: ${props.gray50};
  font-size: 0.8rem;
  margin-right: ${props.marginM};
  width: 30px;
`;

const Remove = Styled.div`
  color: red;
  user-select: none;
  cursor: pointer;
`;

const ToCheckout = Styled.div`
  border-top: 1px solid ${props.gray50};
  text-align: center;
  padding: ${props.paddingM};
  
  a {
    color: white;
    text-decoration: none;
    
    &:hover {
      color: orange;
    }
  }
`;

export class Summary extends PureComponent {
  static defaultProps = {
    items: {},
    cart: {
      quantities: {},
      ids: []
    }
  };

  static propTypes = {
    cart: PropTypes.object,
    items: PropTypes.array,
    removeFromCart: PropTypes.func,
    className: PropTypes.any,
    action: PropTypes.node
  };

  /**
   * Return brand, title if there is a brand, otherwise only the title.
   *
   * @param item
   * @return {string}
   */
  normalizedName = item => {
    const { cart } = this.props;
    const name = [item.brand, item.title].filter(i => i).join(", ");
    const quantity = cart.quantities[item.id];
    return (
      <Fragment>
        <Quantity>(x{quantity})</Quantity>
        {name}
      </Fragment>
    );
  };

  price = item => {
    const { cart } = this.props;
    const price = (item.discounted || item.price) * cart.quantities[item.id];
    return `CHF ${price.toFixed(2)}`;
  };

  getTotal = () => {
    const { cart, items } = this.props;
    return getTotal({ items, cart: cart.quantities });
  };

  getSubtotal = () => {
    const { cart, items } = this.props;
    return getSubtotal({ items, cart: cart.quantities });
  };

  render() {
    const { cart, items, removeFromCart, action } = this.props;
    const itemsInCart = cart.ids.map(id => items.filter(i => i.id === id)[0]);
    const total = this.getTotal();
    const subtotal = this.getSubtotal();

    return (
      <StyledSummary className={this.props.className}>
        {itemsInCart.map(item => (
          <Row key={item.id}>
            <Col>{this.normalizedName(item)}</Col>
            <Col>{this.price(item)}</Col>
            <Col onClick={() => removeFromCart(item)}>
              <Remove className="fas fa-minus-circle" />
            </Col>
          </Row>
        ))}
        <Row withBorderTop>Subtotal: CHF {subtotal}</Row>
        <Row withBorderTop>Discount: CHF {(+subtotal - +total).toFixed(2)}</Row>
        <Row withBorderTop>Total: CHF {total}</Row>
        <ToCheckout>{action}</ToCheckout>
      </StyledSummary>
    );
  }
}

export const mapStateToProps = state => ({
  cart: state.cart,
  items: state.items.all
});

export default connect(mapStateToProps, { removeFromCart })(Summary);
