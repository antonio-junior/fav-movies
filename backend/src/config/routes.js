const express = require('express');

const AuthService = require('../api/auth/authService');
const FavMovies = require('../api/favmovies/favMoviesService');

module.exports = server => {
  server.use(AuthService.validateToken);

  const api = express.Router();
  api.post('/login', AuthService.login);

  server.use('/api', api);
  FavMovies.register(api, '/favmovies');
};
