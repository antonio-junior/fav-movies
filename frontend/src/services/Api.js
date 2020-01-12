import axios from 'axios';

const API_URL = process.env.API_URL_v1;
const BASE_URL = `${API_URL}/favmovies`;

const Api = {
  getApiURL() {
    return API_URL;
  },

  count(email) {
    const COUNT_URL = `${BASE_URL}/count`;

    return new Promise((resolve, reject) => {
      const request = axios({
        method: 'POST',
        url: COUNT_URL,
        data: { owner: email },
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
    const UPDATE_URL = `${BASE_URL}/${id}`;

    return new Promise((resolve, reject) => {
      const request = axios.put(UPDATE_URL, data);

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
    const GET_URL = `${BASE_URL}/${id}`;

    return new Promise((resolve, reject) => {
      const request = axios.get(GET_URL);

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

  getAll(email) {
    return new Promise((resolve, reject) => {
      const request = axios.get(`${BASE_URL}?owner=${email}`);

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

  getSummary(field, owner) {
    const SUMMARY_URL = `${BASE_URL}/summary`;

    return new Promise((resolve, reject) => {
      const request = axios({
        method: 'POST',
        url: SUMMARY_URL,
        data: { field, owner },
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

  getFavoriteId(imdbid, owner) {
    const SUMMARY_URL = `${BASE_URL}/getid`;

    return new Promise((resolve, reject) => {
      const request = axios({
        method: 'POST',
        url: SUMMARY_URL,
        data: { imdbid, owner },
      });

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
