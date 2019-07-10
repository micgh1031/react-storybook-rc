import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Container from '../../Layout/Container/Container';
import Content from '../../Layout/Container/Content';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import SidebarToggle from '../../UI/SidebarToggle/SidebarToggle';
import HeadingSmall from '../../UI/Text/HeadingSmall';
import Button from '../../UI/Button/Button';

import { carbonAmountIn } from '../../../utils/carbon';

import Forest from './Forest';

import './ForestList.css';

class ForestList extends Component {
  constructor(props){
    super(props);

    this.state = {
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth.bind(this));
  }

  updateWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render(){
    const { forests, getData, openForestDetails, isPaymentPossible } = this.props;
    const { windowWidth } = this.state;

    return (
      windowWidth > 768 ?
      <Container>
        <Content className="create-forest-list">
          {
            forests.map(forest => (
                <Forest
                  available={forest.available}
                  key={forest.id}
                  forest={forest}
                  purchasable={true}
                  getData={getData.bind(
                    this,
                    forest.price_sqm,
                    carbonAmountIn(25,forest.timeline_formula)
                  )}
                  openForestDetails={openForestDetails}
                  windowWidth={windowWidth}
                  isPaymentPossible={isPaymentPossible}
                />
              ))
          }
        </Content>
      </Container>
      :
      <Sidebar className="create-forest-list">
        <Box
          center
          justifyContent="space-between"
          className="create-forest__title">

          <HeadingSmall>
            <FormattedMessage
              id={'Forests.selectForest'}
              defaultMessage={'Select Forest'}
            />
          </HeadingSmall>

          <Button className="create-forest__sidebar-button">
            <FormattedMessage
              id={'Forest.chooseForest'}
            />
          </Button>

          <SidebarToggle/>
        </Box>
        {
          forests.map(forest => (
              <Forest
                available={forest.available}
                key={forest.id}
                forest={forest}
                purchasable={true}
                getData={getData.bind(
                  this,
                  forest.price_sqm,
                  carbonAmountIn(25,forest.timeline_formula)
                )}
                openForestDetails={openForestDetails}
                windowWidth={windowWidth}
                isPaymentPossible={isPaymentPossible}
              />
            ))
        }
      </Sidebar>
    );
  }
}

ForestList.propTypes = {
  forests: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  openForestDetails: PropTypes.func.isRequired,
  isPaymentPossible: PropTypes.func.isRequired,
};

export default ForestList;
