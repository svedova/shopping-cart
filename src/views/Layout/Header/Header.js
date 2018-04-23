import React, { PureComponent } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "./components";
import { Container } from "@/views/Layout";
import Cart from "@/views/Cart";

const StyledHeader = Styled.div`
  display: flex;
  flex: 0 0 auto;
  border-bottom: 1px solid white;
  background-color: black;
  color: white;
`;

export default class Header extends PureComponent {
  render() {
    return (
      <StyledHeader>
        <Container margin="0 auto" flexDirection="row" padding="1rem">
          <Link to="/">
            <Logo>MySuperMarket.com</Logo>
          </Link>
          <Cart />
        </Container>
      </StyledHeader>
    );
  }
}
