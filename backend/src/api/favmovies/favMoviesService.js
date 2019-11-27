const FavMovies = require('./favMovies')
const errorHandler = require('../common/errorHandler')

FavMovies.methods(['get', 'post', 'put', 'delete'])
FavMovies.updateOptions({ new: true, runValidators: false })
FavMovies.after('post', errorHandler).after('put', errorHandler)

async function count () {
    return FavMovies.countDocuments();
}

FavMovies.before('post', async (req, res, next) => {
    req.body.index = await count();
    next()
})

FavMovies.route('count', (req, res, next) => {
    FavMovies.countDocuments((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

FavMovies.route('summary', (req, res, next) => {
    const { field } = req.body;
    FavMovies.find({}).select(`${field} -_id`).exec((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})


module.exports = FavMovies