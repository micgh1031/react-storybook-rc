import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ForestSection from '../UI/ForestSection';
import ForestTitle from '../UI/ForestTitle';
import PatronsPodium from './PatronsPodium';
import PatronsList from './PatronsList';
import Pagination from '../../UI/Pagination/Pagination';

const Patrons = ({
  data,
  getMore,
  isFetching,
  page,
  pageLength,
  patrons,
  podium,
  user,
}) => (
  <div>
    <ForestSection>
      <ForestTitle>
        <FormattedMessage
          id={'ForestDetails.patronsTitle'}
          defaultMessage={'Leaderboard'}
        />
      </ForestTitle>
      <PatronsPodium patrons={podium} />
    </ForestSection>

    <ForestSection>
      <div style={{opacity: isFetching ? '0.5' : '1'}}>
        <PatronsList
          patrons={patrons}
          selfPosition={data.self_rank}
          selfSurface={data.self_surface}
          user={user}
        />
      </div>
    </ForestSection>

    { data.total &&
      <ForestSection>
        <Pagination
          current={page}
          getMore={getMore}
          pageLength={pageLength}
          total={data.total}
        />
      </ForestSection>
    }
  </div>
);

Patrons.propTypes = {
  data: PropTypes.object.isRequired,
  getMore: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  patrons: PropTypes.array.isRequired,
  podium: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default Patrons;
