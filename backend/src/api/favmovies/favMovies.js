const restful = require('node-restful')
const mongoose = restful.mongoose

const movieSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    index: { type: Number, required: true },
    comment: { type: String, required: false },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    //genre: { type: Array, required: true },
    country: { type: String, required: true },
    poster: { type: String, required: true },
    imdbID: { type: String, required: true },
})

module.exports = restful.model('movies', movieSchema)