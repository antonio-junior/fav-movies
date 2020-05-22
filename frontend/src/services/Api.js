import axios from 'axios';

import Auth from './Auth';

const API_URL = process.env.API_ENDPOINT;
const BASE_URL = `${API_URL}/favmovies`;

const token = Auth.getStoredUser() ? Auth.getStoredUser().token : null;
const owner = Auth.getStoredUser() ? Auth.getStoredUser().email : null;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    owner,
  },
});

const Api = {
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

  update(id, data) {
    const UPDATE_URL = `/${id}`;

    return new Promise((resolve, reject) => {
      const request = instance.put(UPDATE_URL, data);

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

  get(id) {
    const GET_URL = `/${id}`;

    return new Promise((resolve, reject) => {
      const request = instance.get(GET_URL);

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

  getAll() {
    return new Promise((resolve, reject) => {
      const request = instance.get();

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

  insert(data) {
    return new Promise((resolve, reject) => {
      const request = instance.post(BASE_URL, data);

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

  delete(id) {
    const DELETE_MOVIE_URL = `/${id}`;

    return new Promise((resolve, reject) => {
      const request = instance.delete(DELETE_MOVIE_URL);

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

  getFavoriteId(imdbid) {
    const SUMMARY_URL = `/getid`;

    return new Promise((resolve, reject) => {
      const request = instance.post(SUMMARY_URL, { imdbid });

      request.then(
        response => {
          if (response.data.errors) {
            reject({ errors: response.data.errors });
          } else {
            resolve(response.data.value);
          }
        },
        error => {
          reject(new Error(error.message));
        },
      );
    });
  },
};

export default Api;
