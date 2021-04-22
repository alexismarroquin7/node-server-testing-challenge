const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.end()
});

router.get('/:cereal_id', (req, res, next) => {
  res.end()
});

router.post('/', (req, res, next) => {
  res.end()
});

router.delete('/', (req, res, next) => {
  res.end()
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;