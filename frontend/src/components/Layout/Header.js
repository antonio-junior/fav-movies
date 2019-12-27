import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { faHome, faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';

import UserProfile from '../UI/UserProfile';
import history from '../../helpers/history';
import HeaderLink from './HeaderLink';
import './Header.css';
import logo from '../../assets/logodark.png';

const Header = props => {
  const inputRef = useRef(null);
  const [activeKey, setActiveKey] = useState(history.location.pathname);

  const { onSubmit } = props;

  const handleSelect = eventKey => {
    setActiveKey(eventKey);
  };

  const submitQuery = () => {
    history.push('/');
    setActiveKey('/');

    onSubmit(inputRef.current.value);
  };

  const onChangeInput = e => {
    if (e.charCode === 13) {
      submitQuery();
    }
  };

  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt="favmovies"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Fav Movies
      </Navbar.Brand>

      <Nav className="mr-auto" activeKey={activeKey} onSelect={handleSelect}>
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
        <Button variant="outline-info" onClick={() => submitQuery()}>
          Search
        </Button>
      </Form>

      <UserProfile />
    </Navbar>
  );
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Header;
