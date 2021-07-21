const { Router } = require('express');
const { fetchAll } = require('@service/influx');

const router = Router();

router
  .route('')
  .get(fetchAll);

module.exports = router;
