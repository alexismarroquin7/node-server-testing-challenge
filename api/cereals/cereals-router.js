const router = require('express').Router();
const Cereal = require('./cereals-model');

router.get('/', async (req, res, next) => {
  try {
    const cereals = await Cereal.findAll();
    res.status(200).json(cereals);
  } catch(err) {
    next(err);
  }
});

router.get('/:cereal_id', (req, res, next) => {
  res.end()
});

router.post('/', (req, res, next) => {
  res.end()
});

router.delete('/:cereal_id', (req, res, next) => {
  res.end()
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;