const restful = require('node-restful')
const mongoose = restful.mongoose

const movieSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    index: { type: Number, required: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    poster: { type: String, required: true },
    imdbid: { type: String, required: true },
    genre: { type: String, required: true },
    country: { type: String, required: true },
    plot: { type: String, required: true },
},
{ 
    timestamps: { createdAt: 'created_at' } }
)

module.exports = restful.model('movies', movieSchema)