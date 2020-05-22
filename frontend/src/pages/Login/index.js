import React from 'react';
import { Container } from 'react-bootstrap';

import logofull from '../../assets/logofull.png';
import LoginButtons from '../../components/UI/LoginButtons';
import './styles.css';

const Login = () => {
  return (
    <Container className="Login card summary-card">
      <form className="login-form">
        <img
          alt="favmovies"
          src={logofull}
          className="d-inline-block align-top"
          style={{ width: '80px', marginBottom: '20px', paddingBottom: '30px' }}
        />
        <LoginButtons />
      </form>
    </Container>
  );
};

export default Login;
