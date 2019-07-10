import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedNumber, FormattedMessage } from 'react-intl';

import { getFormattedWeight } from '../../../utils/units';

import Sources from '../../UI/Icons/Sources';
import Text from '../../UI/Text/Text';
import Small from '../../UI/Text/Small';
import IconText from '../../UI/Text/IconText';

import carbonIcons from '../../../constants/carbonIcons';
import './CarbonSources.css';

const CarbonSources = ({ sources, handleSelect, selectedSources }) => (
  <div className="create-forest-sources">
    { sources.filter(el => !el.offsetted).map(source => (

      <label
        key={source.id}
        className="create-forest-sources__label"
        htmlFor={source.id}>

        <input
          className="create-forest-sources__input"
          hidden
          id={source.id}
          value={source.amount}
          type="checkbox"
          checked={selectedSources.includes(source.id)}
          onChange={e => { handleSelect(e, source.id); }}
        />

        <Box className="create-forest-sources__item">

          <Box className="create-forest-sources__checkbox">
            <div className="create-forest-sources__checkbox-background"/>
          </Box>

          <Box className="create-forest-sources__image" style={{
            backgroundImage: `url(${carbonIcons[source.type]})`
          }}/>

          <Box className="create-forest-sources__info">

            <Box column className="create-forest-sources__data">
              <Text className="create-forest-sources__text">
                {source.name}
              </Text>
              <Small color="light">
                <FormattedMessage
                  id={'CarbonSources.name'}
                  defaultMessage={'Name'}
                />
              </Small>
            </Box>

            <Box column className="create-forest-sources__data">
              <IconText icon={Sources}>
                <Text color="orange" className="create-forest-sources__text">
                  <FormattedNumber
                    value={getFormattedWeight(source.amount).value}
                  /> {getFormattedWeight(source.amount).unit}
                </Text>
              </IconText>
              <Small color="light">
                <FormattedMessage
                  id={'CarbonSources.produced'}
                  defaultMessage={'CO² Produced'}
                />
              </Small>
            </Box>

          </Box>

        </Box>
      </label>
    ))
    }
  </div>
);

CarbonSources.propTypes = {
  sources: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selectedSources: PropTypes.array.isRequired,
};

export default CarbonSources;
