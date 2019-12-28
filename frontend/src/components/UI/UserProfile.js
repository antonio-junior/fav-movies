import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import history from '../../helpers/History';
import Auth from '../../services/Auth';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const tokenIsValid = async storedUser => {
    const { valid } = await Auth.validate(storedUser.token);
    return valid;
  };

  if (user == null) {
    const storedUser = Auth.getStoredUser();
    if (storedUser) {
      const isValid = tokenIsValid(storedUser);
      if (isValid) setUser(storedUser);
    }
  }

  const onClickLogout = () => {
    Auth.deleteStoredUser();
    setUser(null);
    history.push('/');
    window.location.reload();
  };

  return (
    user && (
      <>
        <span className="profile-container">
          <img className="img" src={user.picture} alt={user.name} />
          <span>
            {user.name} |{' '}
            <Link to="/" onClick={onClickLogout}>
              Logout
            </Link>
          </span>
        </span>
      </>
    )
  );
};

export default UserProfile;
