import React from 'react';
import { Container } from 'react-bootstrap';

import LoginButtons from '../components/UI/LoginButtons';
import './Login.css';
import logofull from '../assets/logofull.png';

const Login = () => {
  return (
    <Container className="Login card summary-card">
      <form>
        <img
          alt="favmovies"
          src={logofull}
          className="d-inline-block align-top"
          style={{ width: '80px', marginBottom: '20px' }}
        />
        <LoginButtons />
      </form>
    </Container>
  );
};

export default Login;
