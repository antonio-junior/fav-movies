import PropTypes from 'prop-types';
import React from 'react';

import gif from '../../assets/loader.gif';

const Loader = ({ width }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <img src={gif} alt="loader" width={width} />
    </div>
  );
};

Loader.propTypes = {
  width: PropTypes.string,
};

Loader.defaultProps = {
  width: '',
};

export default Loader;
