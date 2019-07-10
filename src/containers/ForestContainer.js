import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchForestDetails,
  fetchForests,
} from '../actions/forests';
import { openGallery } from '../actions/UI';
import * as selector from '../selectors/forests';

import ForestDetails from '../components/Forests/Details/ForestDetails';
import Loader from '../components/UI/Loader/Loader';

import mixpanel from 'mixpanel-browser';

class ForestContainer extends Component {
  componentWillMount() {

    const { fetchForestDetails, selectedForestId } = this.props;
    fetchForestDetails(selectedForestId);
  }

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Forest page",
      "Forest": this.props.selectedForestId,
      "Domain": "App"
    });

  }

  render() {
    const {
      forest,
      isFetching,
      openGallery,
      species,
      team,
    } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    if (!forest) {
      return <Redirect replace to="/404" />;
    }

    return (
      <ForestDetails
        forest={forest}
        openGallery={openGallery}
        species={species}
        team={team}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  forest: selector.getForestById(state, ownProps.selectedForestId),
  isFetching: selector.getIsFetchingDetails(state),
  species: selector.getForestSpecies(state, ownProps.selectedForestId),
  team: selector.getForestTeam(state, ownProps.selectedForestId),
});

ForestContainer.propTypes = {
  fetchForestDetails: PropTypes.func.isRequired,
  forest: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  openGallery: PropTypes.func.isRequired,
  selectedForestId: PropTypes.number.isRequired,
  species: PropTypes.array.isRequired,
  team: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  fetchForestDetails,
  fetchForests,
  openGallery,
})(ForestContainer);
