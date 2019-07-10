import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import IconLink from '../../components/UI/Text/IconLink';
import Eye from '../../components/UI/Icons/Eye';
import MapClusterIcon from '../../components/UI/Icons/MapClusterIcon';
import Text from '../../components/UI/Text/Text';
import Huge from '../../components/UI/Text/Huge';
import Heading from '../UI/Text/Heading';
import Carbon from '../Widgets/CarbonBalance/Carbon';
import Graph from '../Widgets/CarbonGraph/Graph';

import ForestList from '../../components/Dashboard/ForestList';

import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import './Dashboard.css';

const PublicDashboard = ({
  emitted,
  captured,
  oxygen,
  formula,
  isAuthed,
  profile,
  surface,
  forests,
}) => {
  return (
    <Box className="carbon-calculator" width="100%">

      <Container className="container__scrollable">
        <Content className="dashboard-public">
          <div className="dashboard__header">
              <div className="dashboard__header--left_column">

                <div
                  className="dashboard__thumbnail__container">
                    <div
                      className="dashboard__thumbnail"
                      style={{
                        backgroundImage: `url(${profile.avatar_url || AvatarPlaceholder})`
                      }} />

                    <Heading>
                      { profile.name }
                    </Heading>
                </div>

                { (profile.website) &&
                <IconLink
                  className="dashboard__public__profile__link"
                  href="{profile.website}"
                  target="_blank"
                  icon={Eye}>
                    <Text color="green">
                    { profile.website }
                    </Text>
                  </IconLink>
                  }
              </div>
              <div className="dashboard__header--right_column">
                  <p className="dashboard__description t-main--light t-main">{ profile.description }</p>
              </div>
          </div>
          <Box className="dashboard__data">
            <Carbon
              emitted={emitted}
              captured={captured}
              oxygen={oxygen}
              className="dashboard__carbon"
              me={false}
            />
            { captured > 0 && formula &&
              <Graph
                years={25}
                formula={formula}
                surface={surface}
                me={false}
                className="dashboard__graph"
              />
            }
          </Box>
        </Content>
        <Content className="dashboard-public-forests">
          <Box className="dashboard__forests">

            <Huge>
                <MapClusterIcon/> <MapClusterIcon/> <MapClusterIcon/> <MapClusterIcon/>
                <br/>
                    <FormattedMessage
                id={'Dashboard.PublicForests'}
                defaultMessage={'{name} Forests'}
                values={{ name: profile.name }}
              />
            </Huge>

            {(forests && forests.length <= 0) ?
              <Box column>
                No forests
                </Box>
              :
              <ForestList
                forests={forests}/>
              }

          </Box>
        </Content>
      </Container>

    </Box>
  );
};

PublicDashboard.propTypes = {
  captured: PropTypes.number.isRequired,
  emitted: PropTypes.number.isRequired,
  formula: PropTypes.string.isRequired,
  oxygen: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
  surface: PropTypes.number.isRequired,
};

export default PublicDashboard;
