import { faHome, faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../assets/logodark.png';
import history from '../../helpers/History';
import { QueryContext } from '../../helpers/QueryStore';
import UserProfile from '../UI/UserProfile';
import HeaderLink from './HeaderLink';
import './Header.css';

const Header = () => {
  const inputRef = useRef(null);
  const [activeKey, setActiveKey] = useState(history.location.pathname);

  const { setQuery } = React.useContext(QueryContext);

  const handleSelect = eventKey => {
    setActiveKey(eventKey);
  };

  const submitQuery = () => {
    history.push('/');
    setActiveKey('/');

    setQuery(inputRef.current.value);
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
          placeholder="Search Movie..."
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

export default Header;
