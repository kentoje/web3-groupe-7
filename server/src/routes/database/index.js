const { Router } = require('express');
const { fetchAll, fetchOne } = require('@service/database');

const router = Router();

router
  .route('/all')
  .get(fetchAll);

router
  .route('/:topic')
  .get(fetchOne);

module.exports = router;
