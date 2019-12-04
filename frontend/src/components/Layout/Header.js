import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { faHome, faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';

import HeaderLink from './HeaderLink';
import './Header.styles.css';

const Header = props => {
  const [active, setActive] = useState('Home');
  const inputRef = useRef(null);

  const { onSubmit } = props;

  const onChangeInput = e => {
    if (e.charCode === 13) {
      onSubmit(inputRef.current.value);
    }
  };

  const onClickLink = e => {
    setActive(e.target.getAttribute('data-rb-event-key'));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Favorite Movies</Navbar.Brand>

      <Nav className="mr-auto" defaultActiveKey={active}>
        <HeaderLink
          link="/"
          onClick={e => onClickLink(e)}
          icon={faHome}
          text="Home"
        />

        <HeaderLink
          link="/favorites"
          onClick={e => onClickLink(e)}
          icon={faStar}
          text="Favorites"
        />
        <HeaderLink
          link="/dashboard"
          onClick={e => onClickLink(e)}
          icon={faChartLine}
          text="Dashboard"
        />
      </Nav>

      <Form inline onSubmit={e => e.preventDefault()}>
        <FormControl
          type="text"
          onKeyPress={e => onChangeInput(e)}
          placeholder="Search"
          className="mr-sm-2"
          ref={inputRef}
        />
        <Button
          variant="outline-info"
          onClick={() => onSubmit(inputRef.current.value)}
        >
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Header;
