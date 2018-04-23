import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { connect } from "react-redux";
import Item from "../Item";

const StyledItems = Styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
`;

class Items extends PureComponent {
  static propTypes = {
    /**
     * List of items.
     */
    items: PropTypes.array,

    /**
     * Whether the items have been already fetched or not.
     */
    fetched: PropTypes.bool,

    /**
     * Key-value pair of filters.
     */
    filters: PropTypes.object
  };

  /**
   * If there are filters, return filtered items. Otherwise
   * return full list.
   */
  items = () => {
    const { items, filters } = this.props;

    if (Object.keys(filters).length) {
      let clone = [...items];

      if (filters.sort === "+price") {
        clone.sort(
          (a, b) => (a.discounted || a.price) - +(b.discounted || b.price)
        );
      } else if (filters.sort === "-price") {
        clone.sort(
          (a, b) => (b.discounted || b.price) - +(a.discounted || a.price)
        );
      }

      if (filters.brand) {
        clone = clone.filter(i => i.brand === filters.brand);
      }

      return clone;
    }

    return items;
  };

  render() {
    const { fetched } = this.props;

    return (
      <StyledItems>
        {fetched
          ? this.items().map(item => <Item key={item.id} item={item} />)
          : [...Array(6).keys()].map(i => <Item key={`ph-${i}`} placeholder />)}
      </StyledItems>
    );
  }
}

export const mapStateToProps = state => ({
  items: state.items.all || [],
  fetched: state.items.fetched,
  filters: state.filters
});

export default connect(mapStateToProps)(Items);
