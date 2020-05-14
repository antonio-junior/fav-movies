import { faHeart as notLike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './styles.css';

const Heart = ({ liked, onClickFavorite }) => {
  return (
    <FontAwesomeIcon
      className={`button-item heart-icon ${liked ? 'like' : ''}`}
      icon={liked ? like : notLike}
      onClick={onClickFavorite}
    />
  );
};

Heart.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default Heart;
