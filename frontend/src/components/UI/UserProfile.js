import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import history from '../../helpers/history';
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
        <span className="_1qv9">
          <img
            className="_2qgu _7ql _1m6h img"
            src={user.picture}
            alt={user.name}
            id="profile_pic_header_100000084947468"
          />
          <span className="_1vp5">
            {user.name} |{' '}
            <Link style={{ color: '#fff' }} to="/" onClick={onClickLogout}>
              Logout
            </Link>
          </span>
        </span>
      </>
    )
  );
};

export default UserProfile;
