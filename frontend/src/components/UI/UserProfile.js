import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../helpers/History';
import Auth from '../../services/Auth';
import './UserProfile.css';

const UserProfile = () => {
  const user = Auth.getStoredUser();

  const onClickLogout = () => {
    Auth.deleteStoredUser();
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
