import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
import { connect } from "react-redux";
import { props, Dropdown, media } from "@/ui";
import { setFilter, resetFilters } from "@/views/List/actions";
import "react-dropdown/style.css";

const StyledFilters = Styled.div`
  flex: 0 0 auto;
  min-width: 250px;
  padding: ${props.paddingM};
  margin-right: ${props.marginL};
  
  ${media.tabletAndSmaller`
    margin-bottom: ${props.marginXL};
  `}
`;

const Row = Styled.div`
  margin-bottom: ${props.marginXL};
  
  ${media.tabletAndSmaller`
    margin-bottom: ${props.marginM};
  `}
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Reset = Styled.span`
  display: block;
  margin-top: ${props.marginXL};
  text-align: center;
  color: black;
  cursor: pointer;
  
  &:hover {
    color: orange;
  }
`;

const sortOptions = [
  { value: "-price", label: "Price decreasing" },
  { value: "+price", label: "Price increasing" }
];

class FiltersView extends PureComponent {
  static propTypes = {
    setFilter: PropTypes.func,
    filters: PropTypes.object,
    resetFilters: PropTypes.func
  };

  setFilter = name => ({ value }) => {
    this.props.setFilter(name, value);
  };

  resetFilters = e => {
    e.preventDefault();
    this.props.resetFilters();
  };

  render() {
    const { filters } = this.props;
    const hasFilters = Object.keys(filters).length > 0;
    const sortValue = sortOptions.filter(o => o.value === filters.sort)[0];

    return (
      <StyledFilters>
        <Row>
          <Dropdown
            options={sortOptions}
            placeholder="Sort by"
            onChange={this.setFilter("sort")}
            value={sortValue && sortValue.label}
          />
        </Row>
        <Row>
          <Dropdown
            options={["Barilla", "Mister Rice", "Tesco"]}
            placeholder="Brand"
            onChange={this.setFilter("brand")}
            value={filters.brand}
          />
        </Row>
        {hasFilters && <Reset onClick={this.resetFilters}>Reset filters</Reset>}
      </StyledFilters>
    );
  }
}

export const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, { setFilter, resetFilters })(
  FiltersView
);
