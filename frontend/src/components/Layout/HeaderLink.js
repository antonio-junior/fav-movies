import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderLink = props => {
  const { text, icon, link } = props;

  return (
    <Nav.Item>
      <Nav.Link as={Link} to={link} eventKey={link}>
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
};

export default HeaderLink;
