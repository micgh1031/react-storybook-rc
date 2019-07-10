import React from 'react';
import { Box } from 'react-layout-components';

import './Loader.css';

const Loader = () => {
  return (
    <Box fit center>
      <Box column center className="loader">
        <div className="loader__holder">
          <div className="loader__state" />
        </div>
      </Box>
    </Box>
  );
};

export default Loader;
