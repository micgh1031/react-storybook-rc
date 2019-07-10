import { Component } from 'react';
import PropTypes from 'prop-types';

class Keybinding extends Component {
  constructor() {
    super();

    this.onKey = this.onKey.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener(this.props.event, this.onKey);
  }

  componentWillUnmount() {
    document.removeEventListener(this.props.event, this.onKey);
  }

  onKey(e) {
    const {
      preventDefault,
      stopPropagation,
      preventConflict,
      onKey
    } = this.props;
    const target = preventConflict.indexOf(e.target.tagName.toLowerCase()) > -1;

    if (preventDefault) e.preventDefault();
    if (stopPropagation) e.stopPropagation();
    if (!target) onKey(e);
  }

  render() {
    return false;
  }
}

Keybinding.defaultProps = {
  event: 'keydown',
  preventConflict: [],
  preventDefault: false,
  stopPropagation: false
};

Keybinding.propTypes = {
  event: PropTypes.string,
  preventConflict: PropTypes.array,
  onKey: PropTypes.func.isRequired,
  preventDefault: PropTypes.bool,
  stopPropagation: PropTypes.bool
};

export default Keybinding;
