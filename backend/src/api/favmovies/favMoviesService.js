const errorHandler = require('../common/errorHandler');
const FavMovies = require('./favMovies');

FavMovies.methods(['get', 'post', 'put', 'delete']);
FavMovies.updateOptions({ new: true, runValidators: false });
FavMovies.after('post', errorHandler).after('put', errorHandler);

async function maxIndex() {
  const req = await FavMovies.find({}, { index: 1, _id: 0 })
    .sort({ index: -1 })
    .limit(1)
    .exec();

  return req[0].index;
}

FavMovies.before('post', async (req, res, next) => {
  const newIndex = (await maxIndex()) + 1;
  req.body.index = newIndex;
  next();
});

FavMovies.route('count', (req, res) => {
  FavMovies.countDocuments({ owner: req.body.owner }, (error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

FavMovies.route('summary', (req, res) => {
  const { field, owner } = req.body;
  FavMovies.find({ owner })
    .select(`${field} -_id`)
    .exec((error, value) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json({ value });
      }
    });
});

FavMovies.route('getid', (req, res) => {
  const { imdbid, owner } = req.body;
  FavMovies.find({ owner, imdbid })
    .select('_id')
    .exec((error, value) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json({ value });
      }
    });
});

module.exports = FavMovies;
