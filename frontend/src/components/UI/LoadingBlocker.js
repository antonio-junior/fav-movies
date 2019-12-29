import PropTypes from 'prop-types';
import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const LoadingBlocker = ({ active, text, children }) => {
  return (
    <LoadingOverlay
      spinner
      active={active}
      styles={{
        overlay: base => ({
          ...base,
          background: 'rgba(128, 128, 128, 0.5)',
        }),
        wrapper: base => ({
          ...base,
          position: 'inherit',
        }),
      }}
      text={text}
    >
      {' '}
      {children}
    </LoadingOverlay>
  );
};

LoadingBlocker.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default LoadingBlocker;
