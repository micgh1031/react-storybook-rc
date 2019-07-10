import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Container from '../Container/Container';
import Content from '../Container/Content';

import './VerticalCenter.css';

const VerticalCenter = ({
  children,
  className,
  ...props,
}) => (
  <Container {...props} className="l-container--vertical-center">
    <Content className={cx(className)}>
      { children }
    </Content>
  </Container>
);

VerticalCenter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default VerticalCenter;
