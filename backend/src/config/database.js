const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const pass = process.env.REACT_APP_DB_PASS;
module.exports = mongoose.connect(`mongodb+srv://fav-movies-user:${pass}@cluster-fav-movies-fbb7k.mongodb.net/fav?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connecting to database successful'))
    .catch(err => console.error('could not connect to mongo DB', err))

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."