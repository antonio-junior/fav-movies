import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Api from '../services/Api';

export const AppContext = React.createContext(null);

const AppStore = ({ children }) => {
  const [query, setQuery] = React.useState('');
  const [favorites, setFavorites] = React.useState(null);
  const [hasError, setError] = React.useState(null);

  useEffect(() => {
    if (!favorites)
      Api.getAll()
        .then(res => setFavorites(res.data.reverse()))
        .catch(() => {
          setFavorites([]);
          setError(true);
        });
  }, [favorites, setError, setFavorites]);

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
