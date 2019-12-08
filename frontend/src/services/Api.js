import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'http://localhost:3003/api/favmovies';

const Api = {
  getURL() {
    return BASE_URL;
  },

  count() {
    const COUNT_URL = `${BASE_URL}/count`;

    return new Promise((resolve, reject) => {
      const request = axios.get(COUNT_URL);

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
      const request = axios.get(BASE_URL);

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
      const request = axios.post(BASE_URL, data);

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
    const DELETE_MOVIE_URL = `${BASE_URL}/${id}`;

    return new Promise((resolve, reject) => {
      const request = axios({
        method: 'DELETE',
        url: DELETE_MOVIE_URL,
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

  getSummary(field) {
    const SUMMARY_URL = `${BASE_URL}/summary`;

    return new Promise((resolve, reject) => {
      const request = axios({
        method: 'POST',
        url: SUMMARY_URL,
        data: qs.stringify({ field }),
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
};

export default Api;
