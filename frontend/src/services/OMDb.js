import axios from 'axios';

const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

const OMDb = {
  getURL() {
    return BASE_URL;
  },
  search(term) {
    if (!term) return Promise.resolve({});

    const SEARCH_MOVIES_URL = `${OMDb.getURL()}&s=${term}`;

    return new Promise((resolve, reject) => {
      const request = axios.get(SEARCH_MOVIES_URL);

      request.then(
        response => {
          if (response.status !== 200) {
            reject(new Error(response.statusText));
          } else {
            resolve(response.data.Search || []);
          }
        },
        error => {
          reject(new Error(error.message));
        },
      );
    });
  },

  find(imdbid) {
    const FIND_MOVIE_URL = `${BASE_URL}&plot=full&i=${imdbid}`;

    return new Promise((resolve, reject) => {
      const request = axios.get(FIND_MOVIE_URL);

      request.then(
        response => {
          if (response.status !== 200) {
            reject(new Error(response.statusText));
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
};

export default OMDb;
