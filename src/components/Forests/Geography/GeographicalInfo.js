import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import ForestSection from '../UI/ForestSection';
import ForestTitle from '../UI/ForestTitle';
import SpeciesItem from '../UI/SpeciesItem';
import DataItem from '../UI/DataItem';

import ForestGalleryContainer from '../../../containers/ForestGalleryContainer';

import { getFormattedArea } from '../../../utils/units';

import './GeographicalInfo.css';

const GeographicalInfo = ({ forest, species }) => (
  <div className="forest-geo-info">
    <ForestSection className="forest-geo-info__location">
      <ForestTitle>
        <FormattedMessage
          id={'ForestDetails.geoTitle'}
          defaultMessage={'{forestName} location'}
          values={{ forestName: forest.name }}
        />
      </ForestTitle>

      <div className="forest-geo-info__image">
        <ForestGalleryContainer
          forestId={forest.id}
          image={forest.main_image}
        />
      </div>

      <div className="forest-geo-info__data">

        <DataItem
          data={
            <span>
              <FormattedNumber
                value={getFormattedArea(forest.total_surface).value}
              /> {getFormattedArea(forest.total_surface).unit}
            </span>
          }
          label={
            <FormattedMessage
              id={'ForestDetails.extension'}
              defaultMessage={'Extension'}
            />
          }
        />

        <DataItem
          color="green"
          data={
            <span>
              <FormattedNumber
                value={getFormattedArea(forest.reforested_surface).value}
              /> {getFormattedArea(forest.reforested_surface).unit}
            </span>
          }
          label={
            <FormattedMessage
              id={'ForestDetails.forestedArea'}
              defaultMessage={'Forested Area'}
            />
          }
        />

        <DataItem
          data={
            <FormattedNumber
              value={(forest.reforested_surface / forest.total_surface * 100).toFixed(2)}
            />
          }
          label={
            <FormattedMessage
              id={'ForestDetails.forestedPercentage'}
              defaultMessage={'Forested %'}
            />
          }
        />

        <DataItem
          data={forest.coords_desc}
          label={
            <FormattedMessage
              id={'ForestDetails.coordinates'}
              defaultMessage={'Coordinates'}
            />
          }
        />

      </div>
    </ForestSection>
    {species.length > 0 &&
      <ForestSection className="forest-geo-info__species">
        <ForestTitle>
          <FormattedMessage
            id={'ForestDetails.speciesTitle'}
            defaultMessage={'{forestName} Species'}
            values={{ forestName: forest.name }}
          />
        </ForestTitle>

        <div className="forest-geo-info__species-list">
          {species.map(speciesItem => (
            <SpeciesItem
              key={speciesItem.id}
              name={speciesItem.name}
              latin={speciesItem.latin_name}
              image={speciesItem.icon}
            />
          ))}
        </div>
      </ForestSection>
    }

  </div>
);

GeographicalInfo.propTypes = {
  forest: PropTypes.object.isRequired,
  species: PropTypes.array.isRequired,
};

export default GeographicalInfo;
