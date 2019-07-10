import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import Container from '../../Layout/Container/Container';
import Content from '../../Layout/Container/Content';
import Filters from './Filters';
import ForestList from './ForestList';
import Details from './Details';
import Carbon from '../../Widgets/CarbonBalance/Carbon';

import './Create.css';

const Create = ({
  closeForestDetails,
  forestDetailsId,
  forests,
  getData,
  handleChange,
  handleSelect,
  mode,
  openForestDetails,
  selectedSources,
  sources,
  values,
  emitted,
  oxygen,
  captured,
  isPaymentPossible,
}) => (
  <Box width="100%" className="create-forest">

    <Container className="create-forest__filters">
      <Content>
        <Filters
          mode={mode}
          handleChange={handleChange}
          handleSelect={handleSelect}
          values={values}
          sources={sources}
          selectedSources={selectedSources}
        />
        { mode === 'carbon' &&
          <Box column className="create-forest-dashboard">
            <Box column className="create-forest-dashboard__inner">
              <Carbon
                emitted={emitted}
                oxygen={oxygen}
                captured={captured + values.carbon}
                tiny={true}
              />
            </Box>
          </Box>
        }
      </Content>
    </Container>

    <ForestList
      forests={forests}
      getData={getData}
      openForestDetails={openForestDetails}
      isPaymentPossible={isPaymentPossible}
    />

    { forestDetailsId &&
      <Details
        forestId={forestDetailsId}
        closeForestDetails={closeForestDetails}
      />
    }
  </Box>
);

Create.propTypes = {
  closeForestDetails: PropTypes.func.isRequired,
  forestDetailsId: PropTypes.number,
  forests: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  openForestDetails: PropTypes.func.isRequired,
  selectedSources: PropTypes.array.isRequired,
  sources: PropTypes.array.isRequired,
  values: PropTypes.shape({
    area: PropTypes.number,
    budget: PropTypes.number,
    carbon: PropTypes.number,
  }).isRequired,
  emitted: PropTypes.number.isRequired,
  oxygen: PropTypes.number.isRequired,
  captured: PropTypes.number.isRequired,
  isPaymentPossible: PropTypes.func.isRequired,
};

export default Create;
