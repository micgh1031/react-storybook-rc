import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Budget from '../../UI/Icons/Budget';
import Area from '../../UI/Icons/Area';
import Sources from '../../UI/Icons/Sources';
import IconText from '../../UI/Text/IconText';
import Text from '../../UI/Text/Text';

import mixpanel from 'mixpanel-browser';

import './Tabs.css';


class Tabs extends Component {

  trackClick(type){
    
    mixpanel.track("Checkout", {
      "Action": "Tab selection",
      "Tab":type,
      "Domain": "App"
    });
  }

  render() {
    return (
      <Box className="create-forest-tabs">

        <NavLink
          activeClassName="active"
          to="/create-forest/carbon"
          className="create-forest-tabs__item"
          onClick={() => this.trackClick('C02')}
          >
          <IconText icon={Sources}>
            <Text>
              <FormattedMessage
                id={'Create.byCo2TabTitle'}
                defaultMessage={'By CO² sources'}
              />
            </Text>
          </IconText>
        </NavLink>

        <NavLink
          activeClassName="active"
          to="/create-forest/budget"
          className="create-forest-tabs__item"
          onClick={() => this.trackClick('Budget')}
          >
          <IconText icon={Budget}>
            <Text>
              <FormattedMessage
                id={'Create.byBudgetTabTitle'}
                defaultMessage={'By budget'}
              />
            </Text>
          </IconText>
        </NavLink>

        <NavLink
          activeClassName="active"
          to="/create-forest/area"
          className="create-forest-tabs__item"
          onClick={() => this.trackClick('Area')}
          >
          <IconText icon={Area}>
            <Text>
              <FormattedMessage
                id={'Create.byAreaTabTitle'}
                defaultMessage={'By area'}
              />
            </Text>
          </IconText>
        </NavLink>

      </Box>
    );
  }

}

export default Tabs;