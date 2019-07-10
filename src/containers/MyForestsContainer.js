import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  fetchForestDetails,
  fetchMyForests,
} from '../actions/forests';
import * as selector from '../selectors/forests';

import ForestMap from '../components/Forests/Map/ForestMap';
import NoForests from '../components/Forests/UI/NoForests';
import ForestContainer from './ForestContainer';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

import Container from '../components/Layout/Container/Container';
import Content from '../components/Layout/Container/Content';
import DynamicWidth from '../components/Layout/DynamicWidth/DynamicWidth';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import HeadingSmall from '../components/UI/Text/HeadingSmall';
import SidebarToggle from '../components/UI/SidebarToggle/SidebarToggle';

import mixpanel from 'mixpanel-browser';

class MyForestsContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };

    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentWillMount() {
    const { fetchMyForests } = this.props;
    fetchMyForests();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowWidth);

    mixpanel.track("Page view", {
      "Action": "Forests",
      "Domain": "App"
    });

  }

  updateWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render() {
    const {
      detailErrorMessages,
      errorMessages,
      fetchForestDetails,
      fetchMyForests,
      isFetching,
      isFetchingTrees,
      match: { params: { id: selectedForestId }},
      myForests,
      selectedForest,
      trees,
    } = this.props;

    if (errorMessages) {
      return (
        <FullErrorFetching
          errorMessage={errorMessages}
          retry={() => { fetchMyForests(); }}
        />
      );
    }

    if (detailErrorMessages) {
      return (
        <FullErrorFetching
          errorMessage={detailErrorMessages}
          retry={fetchForestDetails.bind(this, selectedForestId)}
        />
      );
    }

    if (isFetching) return <Loader />;

    if (myForests.length <= 0) return <NoForests />;

    return (
      <Container>
        {this.state.windowWidth > 768 ?
          <Content coverage="full">
            <DynamicWidth
              style={{
                'width': selectedForestId ? '50%' : '100%',
              }}>
                <ForestMap
                  forests={myForests}
                  isFetchingTrees={isFetchingTrees}
                  selectedForest={selectedForest}
                  selectedForestId={Number(selectedForestId)}
                  trees={trees}
                />
            </DynamicWidth>
            <DynamicWidth
              style={{
                'width': selectedForestId ? '50%' : '0%',
              }}>
                {
                selectedForestId &&
                  <ForestContainer
                  selectedForestId={Number(selectedForestId)}
                  />
                }
            </DynamicWidth>
          </Content>
          :
          <Content coverage="full">
            <DynamicWidth
              style={{
                'width': '100%',
              }}>
              <ForestMap
                forests={myForests}
                isFetchingTrees={isFetchingTrees}
                selectedForest={selectedForest}
                selectedForestId={Number(selectedForestId)}
                trees={trees}
              />
            </DynamicWidth>
            <Sidebar
              className="forest-sidebar__main"
              locked={selectedForestId ? false : true}
              >
              <Box
                center
                justifyContent="space-between"
                className="forest-sidebar__title">

                <HeadingSmall>
                  <FormattedMessage
                    id={'Forests.forestdetails'}
                    defaultMessage={'Forest Details'}
                  />
                </HeadingSmall>

                <SidebarToggle/>
              </Box>
                {
                selectedForestId &&
                  <ForestContainer
                  selectedForestId={Number(selectedForestId)}
                  />
                }
            </Sidebar>
          </Content>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  detailErrorMessages: selector.getDetailsErrorMessages(state),
  errorMessages: selector.getErrorMessages(state),
  isFetching: selector.getIsFetching(state),
  isFetchingTrees: selector.getIsFetchingTrees(state),
  myForests: selector.getMyForests(state),
  selectedForest: selector.getForestById(state, ownProps.match.params.id),
  trees: selector.getForestTrees(state, ownProps.match.params.id),
});

MyForestsContainer.propTypes = {
  detailErrorMessages: PropTypes.string,
  errorMessages: PropTypes.string,
  fetchForestDetails: PropTypes.func.isRequired,
  fetchMyForests: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingTrees: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  myForests: PropTypes.array.isRequired,
  selectedForest: PropTypes.object,
  trees: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  fetchForestDetails,
  fetchMyForests,
})(MyForestsContainer);
