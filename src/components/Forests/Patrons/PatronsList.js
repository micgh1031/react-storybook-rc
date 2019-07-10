import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import PatronItem from './PatronItem';
import PatronsMore from './PatronsMore';

const PatronsList = ({
  patrons,
  selfPosition,
  selfSurface,
  user,
}) => {
  const notPresentInList = patrons.length > 0 &&
    patrons.filter(patron => {
      return patron.rank === selfPosition;
    }).length <= 0;

  const presentAfterList = patrons.length > 0 &&
    patrons[patrons.length - 1].rank < selfPosition;

  return (
    <Box column className="patrons-list">
      { selfSurface && selfPosition && notPresentInList
        && !presentAfterList && user.name &&
        <div className="patrons-list__self">
          <PatronItem
            user={user}
            selfPosition={selfPosition}
            selfSurface={selfSurface}
          />

          <PatronsMore />
        </div>
      }
      <div className="patrons-list__patrons">
        {patrons.map(patron => (
          <PatronItem
            key={patron.rank}
            patron={patron}
            selfPosition={selfPosition}
          />
        ))}
      </div>
      { notPresentInList && presentAfterList && user.name &&
        <div className="patrons-list__self">
          <PatronsMore />

          <PatronItem
            user={user}
            selfPosition={selfPosition}
            selfSurface={selfSurface}
          />
        </div>
      }
    </Box>
  );
};

PatronsList.propTypes = {
  patrons: PropTypes.array.isRequired,
  selfPosition: PropTypes.number,
  selfSurface: PropTypes.number,
  user: PropTypes.object,
};

export default PatronsList;
