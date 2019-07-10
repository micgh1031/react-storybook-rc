import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import Text from '../UI/Text/Text';
import Popover from '../UI/Popover/Popover';

import './CarbonItemPopover.css';

const CarbonItemPopover = ({
  className,
  deleteItem,
  frequency,
  id,
  updateFrequency,
}) => (
  <Popover
    className={cx(className, 'carbon-item-popover')}
    direction="left"
    theme="dark">
    <Text
      className="carbon-item-popover__item"
      tag="p"
      color="50"
      onMouseDown={() => { deleteItem(id); }}>
      <FormattedMessage
        id={'CarbonItemPopover.deleteSource'}
        defaultMessage={'Delete source'}
      />
    </Text>
    { frequency !== 0 &&
      <Text
        className="carbon-item-popover__item"
        tag="p"
        color="50"
        onMouseDown={() => { updateFrequency(id, 'none'); }}>
        <FormattedMessage
          id={'CarbonItemPopover.cancelRecurrency'}
          defaultMessage={'Cancel Recurrency'}
        />
      </Text>
    }
  </Popover>
);

CarbonItemPopover.propTypes = {
  className: PropTypes.string,
  deleteItem: PropTypes.func.isRequired,
  frequency: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  updateFrequency: PropTypes.func.isRequired,
};

export default CarbonItemPopover;
