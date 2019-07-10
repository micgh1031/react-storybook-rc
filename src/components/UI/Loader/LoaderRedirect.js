import React, { Component } from 'react';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';
import FadeProps from 'fade-props';

import './Loader.css';
import Cluster from '../../../assets/images/cluster.png';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loader.suggestion.1',
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    let message = this.state.message;
    message = message.split('.');
    message[2] = parseInt(message[2]) % 4;
    message[2] = parseInt(message[2]) + 1;
    message = message.join('.');
    this.setState({ message: message});
  }

  render() {
    return (
      <Box fit center style={{ marginTop: '-40px' }}>
        <Box column center className="loader">
          <div>
            <img className="map-tree-loader__image" alt="cluster" src={Cluster}/>
            <img className="map-tree-loader__image" alt="cluster" src={Cluster}/>
            <img className="map-tree-loader__image" alt="cluster" src={Cluster}/>
          </div>
          <h4 className="loader_header_text">We are redirecting you...</h4>
          <div className="loader_redirect_holder">
            <div className="loader_redirect_state"/>
          </div>
          <h5 className="loader_footer_text">
            <FadeProps>
              <FormattedMessage
                id={this.state.message}
              />
            </FadeProps>
          </h5>
        </Box>
      </Box>
    );
  }
}

export default Loader;
