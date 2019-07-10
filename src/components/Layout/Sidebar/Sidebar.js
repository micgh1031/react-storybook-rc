import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Container from '../Container/Container';

import './Sidebar.css';
class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      hidden: false,
    };

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.closeSidebar);
    window.addEventListener("closeSidebar", this.closeSidebar);
    window.addEventListener("openSidebar", this.openSidebar);
    window.addEventListener("hideSidebar", this.hideSidebar);
    window.addEventListener("showSidebar", this.showSidebar);
  }

  onComponentUnmount(){
    window.removeEventListener("resize", this.closeSidebar);
    window.removeEventListener("closeSidebar", this.closeSidebar);
    window.removeEventListener("openSidebar", this.openSidebar);
    window.removeEventListener("hideSidebar", this.hideSidebar);
    window.removeEventListener("showSidebar", this.showSidebar);
  }

  openSidebar(){
    if(!this.state.open) {
      this.setState({
        open: true,
      });
    }
  }

  closeSidebar(){
    if(this.state.open) {
      this.setState({
        open: false,
      });
    }
  }

  hideSidebar(){
    if(!this.state.hidden) {
      this.setState({
        hidden: true,
      });
    }
  }

  showSidebar(){
    if(this.state.hidden) {
      this.setState({
        hidden: false,
      });
    }
  }

  render(){
    const {
      children,
      className,
      locked,
      ...other
    } = this.props;

    const { open, hidden } = this.state;

    return (
      <Container {...other}
        className={
          cx(className, 'l-sidebar',
          {
            "is-open": open,
            "is-hidden": hidden
          }
        )}
        onClick={() => {
          if(!locked){
            this.openSidebar();
          }
        }}
        >
        { children }
      </Container>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  locked: PropTypes.bool,
};

export default Sidebar;
