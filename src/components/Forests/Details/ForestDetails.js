import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-layout-components';
import { TabList, Tab, TabPanel } from 'react-tabs';
import { FormattedMessage } from 'react-intl';

import Tabbed from '../../UI/Tabs/Tabbed';
import ForestHeader from '../UI/ForestHeader';
import ForestInfo from '../Info/ForestInfo';
import GeographicalInfo from '../Geography/GeographicalInfo';
import PatronsContainer from '../../../containers/PatronsContainer';
import ForestTeam from '../Team/ForestTeam';

import './ForestDetails.css';

const ForestDetails = ({
  forest,
  openGallery,
  species,
  team,
}) => (
  <ScrollView
    justifyContent="flex-start"
    alignItems="center"
    flex="1"
    className="forest-details">

    <div className="forest-details__content">
      <ForestHeader
        name={forest.name}
        location={forest.location_desc}
        available={forest.available}
      />

      <Tabbed>

        <div className="forest-details__tabs">
          <TabList>
            <Tab>
              <FormattedMessage
                id={'ForestDetails.tabInfo'}
                defaultMessage={'My Forest Info'}
              />
            </Tab>
            <Tab>
              <FormattedMessage
                id={'ForestDetails.tabGeo'}
                defaultMessage={'Geographical Info'}
              />
            </Tab>
            <Tab>
              <FormattedMessage
                id={'ForestDetails.tabPatrons'}
                defaultMessage={'Forest Patrons'}
              />
            </Tab>
            <Tab>
              <FormattedMessage
                id={'ForestDetails.tabTeam'}
                defaultMessage={'Forest Team'}
              />
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <ForestInfo
            area={forest.my_surface}
            capturedCo2={forest.captured_co2}
            description={forest.short_desc}
            forestName={forest.name}
            formula={forest.timeline_formula}
            generatedO2={forest.generated_o2}
            successionPlan={forest.succession_plan}
            surface={forest.total_surface}
            userSurface={forest.user_total_surface}
          />
        </TabPanel>

        <TabPanel>
          <GeographicalInfo
            forest={forest}
            species={species}
            openGallery={openGallery}
          />
        </TabPanel>

        <TabPanel>
          <PatronsContainer forestId={forest.id} />
        </TabPanel>

        <TabPanel>
          <ForestTeam team={team} forestName={forest.name} />
        </TabPanel>

      </Tabbed>
    </div>

  </ScrollView>
);

ForestDetails.propTypes = {
  forest: PropTypes.object.isRequired,
  openGallery: PropTypes.func.isRequired,
  species: PropTypes.array,
  team: PropTypes.array.isRequired,
};

export default ForestDetails;
