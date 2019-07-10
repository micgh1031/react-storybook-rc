import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import ReactMapboxGl from "react-mapbox-gl";
import access from '../../../constants/access';
import {
  defaultCenter,
  defaultZoom,
  defaultFitBounds,
} from '../../../constants/map';
import { withRouter } from 'react-router';

import { openSidebar } from '../../../constants/customEvents';

import MapContent from './MapContent';
import TreeLoader from './TreeLoader';
import StyleToggle from './StyleToggle';

import './ForestMap.css';

const Map = ReactMapboxGl({
  failIfMajorPerformanceCaveat: true,
  accessToken: access.mapbox,
  minZoom: 2,
  maxZoom: 20,
});

class ForestMap extends Component {
  constructor(props) {
    super(props);

    this.reforestumStyle = access.mapboxStyles;
    this.satelliteStyle = 'mapbox://styles/mapbox/satellite-v9';

    this.state = {
      tree: undefined,
      map: undefined,
      zoom: defaultZoom,
      center: defaultCenter,
      mapStyle: this.reforestumStyle,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.zoom < this.state.zoom && nextState.zoom < 10) {
      this.closeForestDetails();
    }
  }

  toggleMapStyle() {
    this.setState({
      mapStyle: this.state.mapStyle === this.reforestumStyle ?
        this.satelliteStyle :
        this.reforestumStyle
    });
  }

  mapSetup(map) {
    this.setState({map}, () => {
      this.props.selectedForestId ? this.fitToForest() : this.fitToMap();
    });
  }

  addTooltip(tree) {
    this.setState({
      tree,
      center: tree ? tree.geometry.coordinates : this.state.center
    });
  }

  waitForResizeThen(callback) {
    const resizeInterval = setInterval(() => {
      if (this.state.map) {
        this.state.map.resize();
      }
    }, 50);
    setTimeout(() => {
      clearInterval(resizeInterval);
      callback();
    }, 400);
  }

  handleZoomEnd(map) {
    this.setState({zoom: map.getZoom()});
  }

  openForestDetails(id) {
    this.props.history.push(`/my-forests/${id}`);

    this.waitForResizeThen(() => {
      this.fitToForest();
      if(window.innerWidth < 768) dispatchEvent(openSidebar);
    });
  }

  closeForestDetails() {
    this.addTooltip();
    this.props.history.push(`/my-forests/`);

    this.waitForResizeThen(() => {
      this.fitToMap();
    });
  }

  fitToMap() {
    if (!this.state.map) return;

    this.state.map.fitBounds(defaultFitBounds);
  }

  fitToForest() {
    const { selectedForest } = this.props;
    if (
      !selectedForest ||
      Object.keys(selectedForest).length <= 0 ||
      !this.state.map
    ) return;

    this.state.map.fitBounds(selectedForest.fitbounds, {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }
    });
  }

  clusterClick(coordinates) {
    this.state.map.flyTo({
      center: coordinates,
      zoom: this.state.zoom + 1
    });
  }

  render() {
    const {
      forests,
      isFetchingTrees,
      selectedForestId,
      trees,
    } = this.props;
    const {
      tree,
      zoom,
      center,
      mapStyle,
    } = this.state;

    return (
      <Box className="forest-map">

        { isFetchingTrees &&
          <TreeLoader />
        }

        <StyleToggle
          toggleMapStyle={this.toggleMapStyle.bind(this)}
          isSatellite={mapStyle === this.satelliteStyle}
        />

        <Map
          className="forest-map__map"
          style={mapStyle} // eslint-disable-line
          center={this.state.map ? null : center}
          zoom={this.state.map ? null : zoom}
          onStyleLoad={this.mapSetup.bind(this)}
          onZoomEnd={map => {
            this.handleZoomEnd(map);
          }}
          onDrag={this.addTooltip.bind(this, undefined)}
          onClick={this.addTooltip.bind(this, undefined)}>

          <MapContent
            isForestSelected={selectedForestId ? true : false}
            forests={forests}
            trees={trees}
            tree={tree}
            closeDetails={this.closeForestDetails.bind(this)}
            openDetails={this.openForestDetails.bind(this)}
            addTooltip={this.addTooltip.bind(this)}
            clusterClick={this.clusterClick.bind(this)}
          />

        </Map>
      </Box>
    );
  }
}

ForestMap.propTypes = {
  forests: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isFetchingTrees: PropTypes.bool.isRequired,
  selectedForest: PropTypes.object,
  selectedForestId: PropTypes.number,
  trees: PropTypes.array,
};

export default withRouter(ForestMap);
