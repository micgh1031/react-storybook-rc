import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import ForestItem from './ForestItem';
import EmptyForest from './EmptyForest';

const ForestList = ({
  forests,
}) => {
  if (forests.length <= 0) {
    return <EmptyForest />;
  }

  return (
    <Box column fit>
      { forests.map(forest => (
            <ForestItem
              key={forest.id}
              forest={forest}
            />
          )
        )
      }
    </Box>
  );
};

ForestList.propTypes = {
  forests: PropTypes.array.isRequired,
};

export default ForestList;
