import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';

import anonymousIcon from '../../../assets/anonymous.jpg';
import Api from '../../../services/Api';
import Auth from '../../../services/Auth';
import GithubButton from '../GithubButton';

const LoginButtons = () => {
  const saveUser = user => {
    Auth.addStoredUser(user);
    window.location.reload();
  };

  const handleApiLogin = async (provider, id, email, accessToken) => {
    let token = null;
    try {
      const { data } = await Api.login(provider, id, email, accessToken);
      token = data.token;
      if (!token) throw new Error('Invalid Token');
    } catch (err) {
      toast(err);
    }

    return token;
  };

  const responseFacebook = async fbuser => {
    const picture = fbuser.picture.data.url;
    const { id, email, accessToken, name } = fbuser;

    const token = await handleApiLogin('facebook', id, email, accessToken);
    saveUser({ email, picture, name, token });
  };

  const responseGoogle = async response => {
    const { accessToken } = response;
    const { YU: id, yu: email, Ad: name, fL: picture } = response.Pt;

    const token = await handleApiLogin('google', id, email, accessToken);
    saveUser({ email, picture, name, token });
  };

  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: '47853d5a2fead7c705fb',
  //       clientSecret: 'GITHUB_CLIENT_SECRET',
  //     },
  //     (accessToken, refreshToken, profile, cb) => {
  //       console.log(accessToken, refreshToken, profile, cb);
  //     },
  //   ),
  // );
  const onClickLoginGithub = async () => {
    console.log('opa');
    // const { credential, user } = await Firebase.login();
    // const { accessToken } = credential;
    // const { uid: id, email, displayName: name, photoURL: picture } = user;
    // const token = await handleApiLogin('github', id, email, accessToken);
    // saveUser({ email, picture, name, token });
  };

  const onClickAnonymous = async () => {
    const email = 'anonymous@anonymous.com';
    const picture = anonymousIcon;
    const name = 'Anonymous';
    const token = {};
    saveUser({ email, picture, name, token });
  };

  return (
    <>
      <Row>
        <GithubButton onClick={() => onClickLoginGithub} />
      </Row>
      <Row style={{ marginTop: '20px', display: 'block' }}>
        <Button
          className="btn-info"
          style={{ fontSize: 'small' }}
          onClick={() => onClickAnonymous}
        >
          Login as Anonymous
        </Button>
        <span style={{ display: 'block', fontSize: 'xx-small' }}>
          (Favorites and Dashboard are disabled)
        </span>
      </Row>
    </>
  );
};

export default LoginButtons;
