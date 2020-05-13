import PropTypes from 'prop-types';
import React from 'react';

export const AppContext = React.createContext(null);

const AppStore = ({ children }) => {
  const [query, setQuery] = React.useState('');
  const [favorites, setFavorites] = React.useState(null);
  const [hasError, setError] = React.useState(null);

  return (
    <AppContext.Provider
      value={{ query, setQuery, favorites, setFavorites, hasError, setError }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppStore.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppStore;
