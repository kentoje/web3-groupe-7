const { Router } = require('express');
const {
  fetchAllDetectors,
  fetchAllExtinguishers,
  fetchOneDetector,
  fetchOneExtinguisher,
} = require('@service/database');

const router = Router();

router
  .route('/extinguishers')
  .get(fetchAllExtinguishers);

router
  .route('/extinguisher/:nodeId')
  .get(fetchOneExtinguisher);

router
  .route('/detectors')
  .get(fetchAllDetectors);

router
  .route('/detector/:nodeId')
  .get(fetchOneDetector);

router
  .route('*')
  .get((_, res) => {
    res.redirect(301, '/api/');
  });

module.exports = router;
