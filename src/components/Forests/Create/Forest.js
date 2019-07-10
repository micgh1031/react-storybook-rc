import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import { requiredIf } from '../../../utils/requiredIf';

import ForestGalleryContainer from '../../../containers/ForestGalleryContainer';
import HeadingSmall from '../../UI/Text/HeadingSmall';
import Text from '../../UI/Text/Text';
import DisabledButton from '../../UI/Button/DisabledButton';
import ButtonLink from '../../UI/Button/ButtonLink';
import IconLink from '../../UI/Text/IconLink';
import Eye from '../../UI/Icons/Eye';
import ForestData from './ForestData';

import './Forest.css';

const Forest = ({
  forest,
  getData,
  openForestDetails,
  available,
  thankYou,
  windowWidth,
  isPaymentPossible,
  purchasable
  }) => (
  <Box className="create-forest-item">

    { windowWidth <= 768 && !thankYou &&
      <Box column className="create-forest-item__info">
        <HeadingSmall className="create-forest-item__name">
          {forest.name}
        </HeadingSmall>
        <Text color="light">
          {forest.location_desc}
        </Text>
        <IconLink
          className="create-forest-item__view-details"
          icon={Eye}
          onClick={() => { openForestDetails(forest.id); }}>
          <Text color="light">
            <FormattedMessage
              id={'Forest.viewDetails'}
            />
          </Text>
        </IconLink>
      </Box>
    }

    <Box
      flexBasis="50%"
      className="create-forest-item__image">
      <ForestGalleryContainer
        image={forest.main_image}
        forestId={forest.id}
      />
    </Box>
    <Box
      column
      flexBasis="50%"
      alignItems="flex-start"
      justifyContent="space-between"
      className="create-forest-item__content">

      { (windowWidth > 768 || thankYou) &&
        <Box column className="create-forest-item__info">
          <HeadingSmall className="create-forest-item__name">
            {forest.name}
          </HeadingSmall>
          <Text color="light">
            {forest.location_desc}
          </Text>
        </Box>
      }

      <Box column className="create-forest-item__action">
        {(available || thankYou) &&
          <ForestData
          className="create-forest-item__data"
          data={available ? getData() : {}}
          />
        }

        { (!thankYou && purchasable) &&
          <Box className="create-forest-item__last">

          { !available &&
            <DisabledButton>
              <FormattedMessage
                id={'Forest.comingSoon'}
                defaultMessage={'Coming Soon'}
              />
            </DisabledButton>
          }

          { available &&
            ((!getData().price || getData().price <= 0) ?
            <DisabledButton>
              <FormattedMessage
                id={'Forest.chooseForest'}
                defaultMessage={'Choose Forest'}
              />
            </DisabledButton>
            :
            <ButtonLink
              to={`/checkout?forest=` +
                `${forest.id}` +
                `&area=${getData().area.toFixed(2)}` +
                `&sources=${getData().selectedSources}`}
                onClick={() => { isPaymentPossible(forest.id, getData().area.toFixed(2)); }}
                >
              <FormattedMessage
                id={'Forest.chooseForest'}
                defaultMessage={'Choose Forest'}
              />
            </ButtonLink>)
          }

          { windowWidth > 768 &&
            <IconLink
              className="create-forest-item__view-details"
              icon={Eye}
              onClick={() => { openForestDetails(forest.id); }}>
              <Text color="light">
                <FormattedMessage
                  id={'Forest.viewDetails'}
                  defaultMessage={'View Details'}
                />
              </Text>
            </IconLink>
          }

        </Box>
      }

      </Box>

    </Box>

  </Box>
);

Forest.propTypes = {
  available: PropTypes.bool.isRequired,
  purchasable: PropTypes.bool.isRequired,
  forest: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  openForestDetails: requiredIf(
    PropTypes.func, props => props.type === 'function'
  ),
  thankYou: PropTypes.bool,
  windowWidth: PropTypes.number,
  isPaymentPossible: PropTypes.func,
};

export default Forest;
