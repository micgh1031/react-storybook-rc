import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import Huge from '../UI/Text/Huge';
import Carbon from '../Widgets/CarbonBalance/Carbon';
import Graph from '../Widgets/CarbonGraph/Graph';
import CarbonSidebarContainer from '../../containers/CarbonSidebarContainer';

import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import './Dashboard.css';

const Dashboard = ({
  emitted,
  captured,
  oxygen,
  formula,
  isAuthed,
  user,
  surface,
}) => {
  const footprint = captured - emitted;

  return (
    <Box className="carbon-calculator" width="100%">

      <Container>
        <Content className="dashboard">
          <div className="dashboard__message">
            { isAuthed &&
              <div
                className="dashboard__thumbnail"
                style={{
                  backgroundImage: `url(${user.avatar_url || AvatarPlaceholder})`
                }} />
            }
            <Huge>
              { isAuthed ?
                <FormattedMessage
                  id={'Dashboard.LoggedInGreeting'}
                  defaultMessage={'Welcome, {name}!'}
                  values={{ name: user.name }}
                /> :
                <FormattedMessage
                  id={'Dashboard.LoggedOutGreeting'}
                  defaultMessage={'Welcome!'}
                />
              }
            </Huge>

            <Huge color={footprint < 0 ? 'orange' : 'green'}>
              { captured === 0 && emitted === 0 ?
                <FormattedMessage
                  id={'Dashboard.greetingEmpty'}
                  defaultMessage={"It's time to create your first forest!"}
                />
                : footprint >= 0 ?
                <FormattedMessage
                  id={'Dashboard.greetingPositive'}
                  defaultMessage={"Things look very promising!"}
                /> :
                <FormattedMessage
                  id={'Dashboard.greetingNegative'}
                  defaultMessage={"Things could be better…"}
                />
              }
            </Huge>

          </div>
          <Box className="dashboard__data">
            <Carbon
              emitted={emitted}
              captured={captured}
              oxygen={oxygen}
              className="dashboard__carbon"
            />
            { captured > 0 && formula &&
              <Graph
                years={25}
                formula={formula}
                surface={surface}
                className="dashboard__graph"
              />
            }
          </Box>
        </Content>
      </Container>

      <CarbonSidebarContainer dashboard={true}/>

    </Box>
  );
};

Dashboard.propTypes = {
  captured: PropTypes.number.isRequired,
  emitted: PropTypes.number.isRequired,
  formula: PropTypes.string.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  oxygen: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  surface: PropTypes.number.isRequired,
};

export default Dashboard;
