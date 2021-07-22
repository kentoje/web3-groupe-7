const { Router } = require('express');
const { fetchAll, fetchFilter } = require('@service/influx');

const router = Router();

router
  .route('')
  .get(fetchAll);

router
  .route('/filter')
  .get(fetchFilter);

module.exports = router;
