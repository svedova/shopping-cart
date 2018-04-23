/* global firebase */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled, { css, keyframes } from "styled-components";
import { connect } from "react-redux";
import { addToCart } from "@/views/Cart/actions";
import { props, media } from "@/ui";
import {
  Price,
  PriceWrapper,
  Discount,
  AddToCart,
  Title,
  Image,
  ImageWrapper,
  Sale
} from "./components";

const transition = "all 0.3s cubic-bezier(.25,.8,.25,1) 0.2s;";
const shineFromLeft = keyframes`
  from { top: -110%; left: -210%; }
  to { top: -30%; left: -30%; }
`;

const placeholder = css`
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 70%;
    background-color: #ccc;
  }

  &:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    transform: rotate(30deg);
    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.13) 77%,
      rgba(255, 255, 255, 0.5) 92%,
      rgba(255, 255, 255, 0) 100%
    );
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
    animation: ${shineFromLeft} 1.25s infinite linear;
    z-index: 1;
  }
`;

const nonPlaceholder = css`
  .fa-cart-plus {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: white;
    z-index: 10;
    transition: ${transition};
  }

  &:after {
    content: "";
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: ${transition};
    opacity: 0;
    visibility: hidden;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props.shadowM};

    &:after,
    .fa-cart-plus {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledItem = Styled.div`
  padding: ${props.paddingM};
  background: white;
  box-shadow: ${props.shadowS};
  display: block;
  height: 250px;
  width: 242px;
  margin-right: 2%;
  margin-bottom: ${props.marginL};
  transition: ${transition};
  cursor: pointer;
  position: relative;
  user-select: none;
  overflow: ${p => p.overflow};
  
  &:nth-child(3n) {
    margin-right: 0;
  }
  
  ${p => (p.isPlaceholder ? placeholder : nonPlaceholder)}
  
  ${media.desktopAndSmaller`
    width: 200px;
    
    &:nth-child(3n) {
      margin-right: 2%;
    }
  `}
  
`;

const NumberOfItems = Styled.span`
  position: absolute;
  top: ${props.marginL};
  left: ${props.marginL};
  color: red;
`;

class Item extends PureComponent {
  static defaultProps = {
    item: {},
    cart: {}
  };

  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.string,
      brand: PropTypes.string,
      id: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      discount: PropTypes.number // Percentage of discount
    }),

    cart: PropTypes.object,

    /**
     * Whether this is a placeholder item or not.
     */
    placeholder: PropTypes.bool,

    /**
     * Action injected by redux.
     */
    addToCart: PropTypes.func
  };

  state = {
    image: null
  };

  constructor(props) {
    super(props);
    props.item.id && this.getFileImage();
  }

  /**
   * For simplicity I've stored the images locally. Normally this should be done
   * through a CDN or an image server.
   */
  getFileImage = () => {
    const { item } = this.props;

    firebase
      .storage()
      .ref()
      .child(`${item.id}.jpg`)
      .getDownloadURL()
      .then(url => this.setState({ image: url }));
  };

  addToCart = () => {
    const { item, addToCart } = this.props;

    addToCart(item);
  };

  render() {
    if (this.props.placeholder) {
      return <StyledItem isPlaceholder overflow={"hidden"} />;
    }

    const { image } = this.state;
    const {
      item: { title, brand, price, discount, discounted, id },
      cart
    } = this.props;

    const name = [brand, title].filter(i => i).join(", ");

    return (
      <StyledItem onClick={this.addToCart}>
        <NumberOfItems>{cart[id]}</NumberOfItems>
        <ImageWrapper>{image && <Image src={image} />}</ImageWrapper>
        <Title children={name} />
        <PriceWrapper>
          <Price discounted={!!discounted}>CHF {(+price).toFixed(2)}</Price>
          {discounted && <Discount children={`CHF ${discounted}`} />}
        </PriceWrapper>
        <AddToCart className={"fas fa-cart-plus"} />
        {isNaN(+discount) === false && <Sale>-%{discount}</Sale>}
      </StyledItem>
    );
  }
}

export const mapStateToProps = state => ({
  cart: state.cart.quantities
});

export default connect(mapStateToProps, { addToCart })(Item);
