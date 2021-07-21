const { Router } = require('express');
const { fetchAll, fetchById } = require('@service/influx');

const router = Router();

router
  .route('')
  .get(fetchAll);

router
  .route('/area')
  .get(fetchById);

module.exports = router;
