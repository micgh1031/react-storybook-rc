import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeGallery } from '../actions/UI';
import { getGallery } from '../selectors/UI';

import Gallery from '../components/UI/Gallery/Gallery';

class GalleryProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.gallery.length <= 0) {
      this.setState({index: 0});
    }
  }

  previous() {
    this.setState({
      index: this.state.index === 0
        ? this.props.gallery.length - 1
        : this.state.index - 1
    });
  }

  next() {
    this.setState({
      index: this.state.index === this.props.gallery.length - 1
      ? 0
      : this.state.index + 1
    });
  }

  render() {
    const { gallery, closeGallery } = this.props;

    if (gallery.length <= 0) return false;

    return (
      <Gallery
        gallery={gallery}
        index={this.state.index}
        previous={this.previous.bind(this)}
        next={this.next.bind(this)}
        closeGallery={closeGallery}
      />
    );
  }
}

GalleryProvider.propTypes = {
  gallery: PropTypes.array,
  closeGallery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: getGallery(state)
});

export default connect(mapStateToProps, { closeGallery })(GalleryProvider);
