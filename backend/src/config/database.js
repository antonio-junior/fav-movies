/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const URL = process.env.DB_URL;
module.exports = mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connecting to database successful'))
  .catch(err => console.error('could not connect to mongo DB', err));

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
