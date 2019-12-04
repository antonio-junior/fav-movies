import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderLink = props => {
  const { text, icon, link, onClick } = props;

  return (
    <Nav.Item>
      <Nav.Link as={Link} to={link} onClick={onClick} eventKey={text}>
        <i className="icon">
          <FontAwesomeIcon icon={icon} />
        </i>
        {text}
      </Nav.Link>
    </Nav.Item>
  );
};

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HeaderLink;
