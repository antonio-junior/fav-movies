import PropTypes from 'prop-types';
import React from 'react';

export const QueryContext = React.createContext(null);

const QueryStore = ({ children }) => {
  const [query, setQuery] = React.useState('');

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

QueryStore.propTypes = {
  children: PropTypes.element.isRequired,
};

export default QueryStore;
