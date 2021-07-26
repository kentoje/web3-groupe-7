const { Router } = require('express');
const { getDocumentation } = require('@service/documentation');

const router = Router();

router
  .route('')
  .get(getDocumentation);

module.exports = router;
