import React from 'react';
import PropTypes from 'prop-types';

import ForestContainer from '../../../containers/ForestContainer';
import Close from '../../UI/Icons/Close';

import './Details.css';

const Details = ({ forestId, closeForestDetails }) => {
  return (
    <div className="create-forest-details">

      <div className="create-forest-details__inner">
        <ForestContainer selectedForestId={forestId} />
      </div>

      <div
        className="create-forest-details__overlay"
        onClick={closeForestDetails}>
        <Close className="create-forest-details__close" />
      </div>

    </div>
  );
};

Details.propTypes = {
  forestId: PropTypes.number.isRequired,
  closeForestDetails: PropTypes.func.isRequired,
};

export default Details;
