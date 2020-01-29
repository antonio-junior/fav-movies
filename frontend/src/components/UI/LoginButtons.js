import React from 'react';
import Row from 'react-bootstrap/Row';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';

import Auth from '../../services/Auth';
import Firebase from '../../services/Firebase';

const LoginButtons = () => {
  const saveUser = user => {
    Auth.addStoredUser(user);
    window.location.reload();
  };

  const responseFacebook = fbuser => {
    const picture = fbuser.picture.data.url;
    const { id, email, accessToken, name } = fbuser;

    Auth.login('facebook', id, email, accessToken)
      .then(res => {
        const { token } = res.data;
        saveUser({ email, picture, name, token });
      })
      .catch(err => toast(err));
  };

  const responseGoogle = response => {
    const { accessToken } = response;
    const { Eea: id, U3: email, ig: name, Paa: picture } = response.w3;

    Auth.login('google', id, email, accessToken)
      .then(res => {
        const { token } = res.data;
        saveUser({ email, picture, name, token });
      })
      .catch(err => toast(err));
  };

  const onClickLoginGithub = () => {
    Firebase.login()
      .then(result => {
        const { credential, user } = result;
        const { accessToken } = credential;
        const { uid: id, email, displayName: name, photoURL: picture } = user;

        Auth.login('github', id, email, accessToken)
          .then(res => {
            const { token } = res.data;
            saveUser({ email, picture, name, token });
          })
          .catch(err => toast(err));
      })
      .catch(err => toast(err));
  };

  return (
    <>
      <Row style={{ justifyContent: 'center' }}>
        <FacebookLogin
          appId="3273645149377600"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </Row>
      <Row>
        <GoogleLogin
          clientId="94209590891-i1nrno8q1g71cg9k88d1s43b2to9u0ld.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </Row>
      <Row>
        <button
          type="button"
          style={{ marginTop: '7px' }}
          onClick={onClickLoginGithub}
        >
          Login with Github
        </button>
      </Row>
    </>
  );
};

export default LoginButtons;
