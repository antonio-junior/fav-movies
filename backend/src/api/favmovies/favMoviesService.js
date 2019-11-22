const FavMovies = require('./favMovies')
const errorHandler = require('../common/errorHandler')

FavMovies.methods(['get', 'post', 'put', 'delete'])
FavMovies.updateOptions({ new: true, runValidators: false })
FavMovies.after('post', errorHandler).after('put', errorHandler)

FavMovies.route('count', (req, res, next) => {
    FavMovies.countDocuments((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = FavMovies