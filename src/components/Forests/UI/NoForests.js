import React from 'react';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import ButtonLink from '../../UI/Button/ButtonLink';
import HeadingSmall from '../../UI/Text/HeadingSmall';
import Text from '../../UI/Text/Text';

import NoForestsImg from '../../../assets/images/noforests.png';

import './NoForests.css';

const NoForests = () => {
  return (
    <Box fit center className="no-forests-available">
      <Box fit center className="no-forests-available__wrapper">

        <Box column center className="no-forests-available__inner">

          <div className="no-forests-available__image" style={{
            backgroundImage: `url(${NoForestsImg})`
          }} />

          <Box column center className="no-forests-available__content">
            <HeadingSmall className="no-forests-available__title">
              <FormattedMessage
                id={'NoForests.title'}
                defaultMessage={'Oh, nothing here!'}
              />
            </HeadingSmall>
            <Text color="light" className="no-forests-available__message">
              <FormattedMessage
                id={'NoForests.text'}
                defaultMessage={'It seems you have no forests yet.'}
              />
            </Text>
            <ButtonLink to="/create-forest" className="no-forests-available__button">
              <FormattedMessage
                id={'NoForests.button'}
                defaultMessage={'Choose my forest'}
              />
            </ButtonLink>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default NoForests;
