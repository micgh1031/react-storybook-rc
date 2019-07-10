import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  // Cluster,
  GeoJSONLayer,
  Marker,
  ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";

import ForestMarker from './ForestMarker';
import ClusterMarker from './ClusterMarker';
// import TreeMarker from './TreeMarker';
import CloseMap from './CloseMap';

class MapContent extends Component {
  renderMarkerCluster(coordinates, pointCount, onClick) {
    return (
      <Marker
        key={coordinates}
        coordinates={coordinates}
        onClick={onClick}>
        <ClusterMarker
          pointCount={pointCount}
        />
      </Marker>
    );
  }

  render() {
    const {
      // addTooltip,
      closeDetails,
      // clusterClick,
      forests,
      isForestSelected,
      openDetails,
      tree,
      // trees,
    } = this.props;

    return (
      <div>

        { isForestSelected &&
          <CloseMap closeMap={closeDetails} />
        }

        <ZoomControl />
        <ScaleControl />

        { forests.map(forest => (
          <span key={forest.id}>

            {/* Whole forest */}
            <GeoJSONLayer
              data={forest.geo_json}
              fillPaint={{
                "fill-color": "#37B877",
                "fill-opacity": 0.2
              }}
              lineLayout={{
                "line-join": "round",
              }}
              linePaint={{
                "line-color": "#37B877",
                "line-width": 2,
              }}
            />

            {/* My area */}
            {
              forest.user_sectors.map(userSector => (
                <GeoJSONLayer
                  key={userSector.sector_id}
                  data={userSector.geo_json}
                  fillPaint={{
                    "fill-color": "#37B877",
                    "fill-opacity": isForestSelected ? 0.7 : 0.5
                  }}
                  lineLayout={{
                    "line-join": "round",
                  }}
                  linePaint={{
                    "line-color": "#37B877",
                    "line-width": 2,
                  }}/>
              ))
            }

            { !isForestSelected &&
              <Marker
                coordinates={forest.coordinates}
                anchor="bottom"
                offset={[0, -5]}
                onClick={() => { openDetails(forest.id); }}>
                <ForestMarker
                  name={forest.location_desc}
                  surface={forest.user_total_surface}
                  carbon={forest.captured_co2}
                  available={forest.available}
                />
              </Marker>
            }
          </span>
        ))}

        {/* Trees  // uncomment when renabling forest trees */}
        {/* <Cluster
          ClusterMarkerFactory={(coordinates, pointerCount) => {
            return this.renderMarkerCluster(
              coordinates,
              pointerCount,
              clusterClick.bind(this, coordinates)
            );
          }}
          nodeSize="32">
          {
            Object.keys(trees).map(tree => (
              <Marker
                key={tree}
                coordinates={trees[tree].geometry.coordinates}
                onClick={() => { addTooltip(trees[tree]); }}
                anchor="bottom"
                offset={[0, 10]}
                >
                <TreeMarker />
              </Marker>
            ))
          }
        </Cluster> */}
        {
          tree &&
          <Marker
            coordinates={tree.geometry.coordinates}
            anchor="bottom"
            offset={[0, -22]}
            >
            <ForestMarker
              name={tree.properties.species}
            />
          </Marker>
        }
      </div>
    );
  }
}

MapContent.propTypes = {
  addTooltip: PropTypes.func.isRequired,
  closeDetails: PropTypes.func.isRequired,
  clusterClick: PropTypes.func.isRequired,
  forests: PropTypes.array.isRequired,
  isForestSelected: PropTypes.bool.isRequired,
  openDetails: PropTypes.func.isRequired,
  tree: PropTypes.object,
  trees: PropTypes.array.isRequired,
};

export default MapContent;
