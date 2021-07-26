const { Router } = require('express');
const { fetchAll, fetchFilter } = require('@service/influx');

const router = Router();

router
  .route('')
  .get(fetchAll);

router
  .route('/filter')
  .get(fetchFilter);

router
  .route('*')
  .get((_, res) => {
    res.redirect(301, '/api/');
  });

module.exports = router;
