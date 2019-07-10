import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchForestGallery } from '../actions/forests';
import { getIsFetchingGallery } from '../selectors/forests';

import ForestImage from '../components/Forests/UI/ForestImage';

class ForestGalleryContainer extends Component {
  render() {
    const {
      image,
      forestId,
      fetchForestGallery,
      isFetching
    } = this.props;

    return (
      <ForestImage
        openGallery={fetchForestGallery.bind(this, forestId)}
        image={image}
        isFetching={isFetching === forestId}
      />
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetchingGallery(state),
});

ForestGalleryContainer.propTypes = {
  isFetching: PropTypes.number,
  fetchForestGallery: PropTypes.func.isRequired,
  forestId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  fetchForestGallery
})(ForestGalleryContainer);
