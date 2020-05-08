const express = require('express');

const AuthService = require('../api/auth/authService');
const FavMovies = require('../api/favmovies/favMoviesService');

module.exports = server => {
  server.use('/api/favmovies', AuthService.validateToken);

  const api = express.Router();
  server.use('/api', api);

  FavMovies.register(api, '/favmovies');

  api.post('/login', AuthService.login);
};
