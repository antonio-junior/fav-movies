import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { faHome, faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';

import history from '../../helpers/history';
import HeaderLink from './HeaderLink';
import './Header.css';

const Header = props => {
  const inputRef = useRef(null);

  const { onSubmit } = props;

  const onChangeInput = e => {
    if (e.charCode === 13) {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Favorite Movies</Navbar.Brand>

      <Nav className="mr-auto" defaultActiveKey={history.location.pathname}>
        <HeaderLink link="/" icon={faHome} text="Home" />

        <HeaderLink link="/favorites" icon={faStar} text="Favorites" />
        <HeaderLink link="/dashboard" icon={faChartLine} text="Dashboard" />
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
