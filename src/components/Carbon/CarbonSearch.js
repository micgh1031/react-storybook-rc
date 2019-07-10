import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './CarbonSearch.css';

class CarbonSearch extends Component {
  componentDidMount() {
    this.input.focus();
  }
  
  render() {
    const {
      className,
      filter,
      placeholder,
      setFilter,
    } = this.props;
    return (
      <input
        type="text"
        placeholder={placeholder}
        className={cx(className,'carbon-search-input')}
        onChange={setFilter}
        value={filter}
        ref={e => this.input = e}
      />
    );
  }
}

CarbonSearch.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default CarbonSearch;
