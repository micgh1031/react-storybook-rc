import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import CarbonItem from './CarbonItem';
import EmptyCarbon from './EmptyCarbon';
import CarbonItemLoading from './CarbonItemLoading';

const CarbonList = ({
  currentlySelected,
  deleteItem,
  isAdding,
  isFetching,
  selectItem,
  sources,
  updateFrequency,
  type,
}) => {
  if (Object.keys(sources).length <= 0 && !isAdding) {
    return <EmptyCarbon type={type}/>;
  }

  return (
    <Box column fit>
      { isAdding &&
        <CarbonItemLoading />
      }
      { sources.map(source => (
          <CarbonItem
            key={source.id}
            id={source.id}
            name={source.name}
            value={source.amount}
            frequency={source.periodicity}
            image={source.type}
            currentlySelected={currentlySelected}
            selectItem={selectItem}
            deleteItem={deleteItem}
            updateFrequency={updateFrequency}
          />
        ))
      }
      { isFetching &&
        <CarbonItemLoading />
      }
    </Box>
  );
};

CarbonList.propTypes = {
  currentlySelected: PropTypes.number,
  deleteItem: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  selectItem: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  updateFrequency: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default CarbonList;
