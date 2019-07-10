import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import Forest from '../Forests/Create/Forest';

const ForestList = ({
  forests,
}) => {
  if (forests.length <= 0) {
    return;
  }

  return (
    <Box column fit>
      { forests.map(forest => (

          <Forest
            available={forest.available}
            key={forest.id}
            forest={forest}
            purchasable={false}
            isPaymentPossible={null}
            thankYou={true}
            getData={()=> {
              return {
                price: null,
                area: forest.user_total_surface,
                carbon: forest.captured_co2,
              };
            }}
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
