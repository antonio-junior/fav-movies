const FavMovies = require('./favMovies')
const errorHandler = require('../common/errorHandler')

FavMovies.methods(['get', 'post', 'put', 'delete'])
FavMovies.updateOptions({ new: true, runValidators: false })
FavMovies.after('post', errorHandler).after('put', errorHandler)

async function maxIndex () {
    const req = await FavMovies.find({}, {index: 1, _id: 0})
        .sort({index:-1}).limit(1)
        .exec();

    return req[0].index;
}

FavMovies.before('post', async (req, res, next) => {
    const newIndex = await maxIndex() + 1;
    console.log(newIndex);
    req.body.index = newIndex;
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