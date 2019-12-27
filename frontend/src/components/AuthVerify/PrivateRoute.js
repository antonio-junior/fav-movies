import React from 'react';

import Login from '../pages/Login';
import Auth from '../../services/Auth';

const PrivateRoute = ({ isPage = true, children }) => {
  const storedUser = Auth.getStoredUser();

  if (!storedUser) {
    if (isPage) return <Login />;

    return null;
  }

  return children;
};

export default PrivateRoute;
