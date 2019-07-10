import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { filterMessages } from '../../../constants/messages';
import Tabs from './Tabs';
import FilterInput from './FilterInput';
import CarbonSources from './CarbonSources';
import OrangePlus from '../../UI/Icons/OrangePlus';
import IconText from '../../UI/Text/IconText';
import Text from '../../UI/Text/Text';

import './Filters.css';

const Filters = ({
  mode,
  handleChange,
  handleSelect,
  values,
  sources,
  selectedSources,
  intl,
}) => (
  <Box column className="create-forest-filters">

    <Box column className="create-forest-filters__inner">
      <Tabs />

      { mode === 'budget' &&
        <FilterInput
          label={intl.formatMessage(filterMessages.budgetLabel)}
          value={values.budget}
          onChange={e => { handleChange(e.target.value, 'budget'); }}
          unit="€"
        />
      }
      { mode === 'area' &&
        <FilterInput
          label={intl.formatMessage(filterMessages.areaLabel)}
          value={values.area}
          onChange={e => { handleChange(e.target.value, 'area'); }}
          unit="m²"
        />
      }
      { mode === 'carbon' &&
        <div>
          <FilterInput
            disabled
            label={intl.formatMessage(filterMessages.co2Label)}
            value={values.carbon}
            onChange={e => { handleChange(e.target.value, 'carbon'); }}
            unit="kg"
          />
          <CarbonSources
            sources={sources}
            handleSelect={handleSelect}
            selectedSources={selectedSources}
          />
          <div className="create-forest-sources__bottom">
            <Link to="/calculator">
              <IconText icon={OrangePlus}>
                  <Text color="orange">
                    <FormattedMessage
                      id={'CarbonSources.addMore'}
                    />
                  </Text>
              </IconText>
            </Link>
          </div>
        </div>
      }

    </Box>
  </Box>
);

Filters.propTypes = {
  mode: PropTypes.oneOf(['carbon', 'budget', 'area']).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  intl: intlShape,
  sources: PropTypes.array.isRequired,
  values: PropTypes.shape({
    area: PropTypes.number,
    budget: PropTypes.number,
    carbon: PropTypes.number,
  }).isRequired,
  selectedSources: PropTypes.array.isRequired,
};

export default injectIntl(Filters);
