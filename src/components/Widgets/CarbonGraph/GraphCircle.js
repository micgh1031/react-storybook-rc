import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import './GraphCircle.css';

const GraphCircle = props => {
  const {
    cx,
    cy,
    index,
    key,
    maxYearsIndex,
    payload,
    selectedYearIndex,
    selectYear
  } = props;

  return (
    <g>
      <circle
        className={classname(
          'carbon-graph-area',
          { 'carbon-graph-area--active': index === selectedYearIndex }
        )}
        key={key}
        r={12}
        cx={cx}
        cy={cy}
        onClick={() => { selectYear(payload.year); }}
        onMouseOver={() => { selectYear(payload.year); }}
      />
      <circle
        className={classname(
          'carbon-graph-circle',
          {
            'carbon-graph-circle--active': index === selectedYearIndex,
            'carbon-graph-circle--marker': index === 0 || index === maxYearsIndex
          }
        )}
        key={key}
        r={index === selectedYearIndex ? 5 : 3}
        cx={cx}
        cy={cy}
        onClick={() => { selectYear(payload.year); }}
        onMouseOver={() => { selectYear(payload.year); }}
      />
    </g>
  );
};

GraphCircle.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  index: PropTypes.number,
  key: PropTypes.number,
  maxYearsIndex: PropTypes.number.isRequired,
  payload: PropTypes.object,
  selectedYearIndex: PropTypes.number.isRequired,
  selectYear: PropTypes.func.isRequired,
};

export default GraphCircle;
