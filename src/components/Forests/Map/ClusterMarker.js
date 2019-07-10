import React from 'react';
import PropTypes from 'prop-types';

import Cluster from '../../../assets/images/cluster.png';

import './ClusterMarker.css';

const ClusterMarker = ({ pointCount }) => (
  <div className="map-tree-cluster">
    <div className="map-tree-cluster__number">
      {pointCount > 99 ? '99+' : pointCount}
    </div>
    <img className="map-tree-cluster__image" alt="cluster" src={Cluster} />
  </div>
);

ClusterMarker.propTypes = {
  pointCount: PropTypes.number.isRequired,
};

export default ClusterMarker;
