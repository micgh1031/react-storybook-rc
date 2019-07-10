import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber, FormattedRelative, FormattedMessage } from 'react-intl';

import { getFormattedWeight, getFormattedArea } from '../../../utils/units';

import Text from '../../UI/Text/Text';
import Uppercase from '../../UI/Text/Uppercase';

const GraphFooter = ({data, getDateIn, userSurface}) => (
  <div className="carbon-graph__footer">
    <div className="carbon-graph__footer-item">
      <Uppercase tag="p" color="dark">
        <FormattedRelative value={getDateIn(1)} />
      </Uppercase>
      <Text color="light">
        <FormattedNumber
          value={getFormattedWeight(data[0].carbon).value}
        /> {getFormattedWeight(data[0].carbon).unit}
      </Text>
    </div>

    <div className="carbon-graph__footer-item">
      <Uppercase tag="p" color="dark">
        <FormattedRelative value={getDateIn(data.length)} />
      </Uppercase>
      <Text color="light">
        <FormattedNumber
          value={getFormattedWeight(data[data.length-1].carbon).value}
        /> {getFormattedWeight(data[data.length-1].carbon).unit}
      </Text>
    </div>

    {userSurface > 0 &&
      <div className="carbon-graph__footer-item">
        <Uppercase tag="p" color="dark">
          <FormattedMessage
            id={'ForestDetails.myForestArea'}
            defaultMessage={'My Forest Area'}
          />
        </Uppercase>
        <Text color="light">
          <FormattedNumber
            value={getFormattedArea(userSurface).value}
          /> {getFormattedArea(userSurface).unit}
        </Text>
      </div>
    }
  </div>
);

GraphFooter.propTypes = {
  data: PropTypes.array.isRequired,
  getDateIn: PropTypes.func.isRequired,
  userSurface: PropTypes.number,
};

export default GraphFooter;
