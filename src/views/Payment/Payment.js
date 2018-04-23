import React, { PureComponent } from "react";
import Styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { props } from "@/ui";
import { emptyCart } from "@/views/Cart/actions";
import { resetFilters } from "@/views/List/actions";

const rotate = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;

const Spinner = Styled.span`
  display: inline-block;
  font-size: 40px;
  transform: rotate(0);
  animation: ${rotate} 1.5s infinite linear;
  margin-right: ${props.marginL}
`;

const Wrapper = Styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
`;

const DeepNote = Styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
`;

class PaymentView extends PureComponent {
  static propTypes = {
    emptyCart: PropTypes.func,
    resetFilters: PropTypes.func
  };

  componentDidMount() {
    this.props.emptyCart();
    this.props.resetFilters();
  }

  render() {
    return (
      <Wrapper>
        <Spinner className="fas fa-spinner" />
        We are pretending to proceed with the payment. <br />If you be patient
        maybe one day you will receive your items...
        <DeepNote>PS: Btw your local storage has been emptied now.</DeepNote>
      </Wrapper>
    );
  }
}

export default connect(null, { emptyCart, resetFilters })(PaymentView);
