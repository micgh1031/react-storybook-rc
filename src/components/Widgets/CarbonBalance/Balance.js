import React from 'react';
import PropTypes from 'prop-types';

import Smile from './Smile';
import Frown from './Frown';
import './Balance.css';

const Balance = ({ captured, emitted }) => {
  const getWidth = (value, total) => value * 100 / total;
  const carbonTotal = emitted + captured;

  return (
    <div className="balance">

      <div className="balance__wrapper">
        <div className="balance__captured balance__balance" style={{
          width: getWidth(captured, carbonTotal) + '%'
        }} />
        <div className="balance__emitted balance__balance" style={{
          width: getWidth(emitted, carbonTotal) + '%'
        }} />
      </div>

      <div className="balance__center" />
      <div className="balance__smile">
        { emitted > captured ? <Frown /> : <Smile /> }
      </div>
    </div>
  );
};

Balance.propTypes = {
  captured: PropTypes.number.isRequired,
  emitted: PropTypes.number.isRequired
};

export default Balance;
