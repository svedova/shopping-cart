import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { connect } from "react-redux";
import { fetchItems } from "./actions";
import { Filters, Items } from "./components";
import { media } from "@/ui";

const StyledList = Styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  
  ${media.tabletAndSmaller`
    flex-direction: column;
  `}
`;

class ListView extends PureComponent {
  static propTypes = {
    fetchItems: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <StyledList>
        <Filters />
        <Items />
      </StyledList>
    );
  }
}

export default connect(null, { fetchItems })(ListView);
