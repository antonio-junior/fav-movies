import axios from 'axios';
import Api from './Api';

const API_URL = Api.getApiURL();
const USER_KEY = '_favmovies_user';

const Auth = {
  login(provider, id, email, outToken) {
    const LOGIN_URL = `${API_URL}/login`;

    return new Promise((resolve, reject) => {
      const request = axios.post(LOGIN_URL, {
        id,
        email,
        outToken,
        provider,
      });

      request.then(
        response => {
          if (response.data.errors) {
            reject({ errors: response.data.errors });
          } else {
            resolve(response);
          }
        },
        error => {
          reject(new Error(error.message));
        },
      );
    });
  },

  validate(token) {
    const VALIDATE_URL = `${API_URL}/validateToken`;

    return new Promise((resolve, reject) => {
      const request = axios.post(VALIDATE_URL, { token });

      request.then(
        response => {
          if (!response.data.valid) {
            reject(response.data);
          } else {
            resolve(response.data);
          }
        },
        error => {
          reject(new Error(error.message));
        },
      );
    });
  },

  getStoredUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  },

  addStoredUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  deleteStoredUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export default Auth;
