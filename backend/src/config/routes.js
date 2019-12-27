const express = require('express')

module.exports = function (server) {

    const api = express.Router()
    server.use('/api', api)

    const FavMovies = require('../api/favmovies/favMoviesService')
    FavMovies.register(api, '/favmovies')

    const AuthService = require('../api/auth/authService')
    api.post('/login', AuthService.login)
    api.post('/validateToken', AuthService.validateToken)
}