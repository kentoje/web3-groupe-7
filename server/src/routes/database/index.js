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
  .route('/extinguisher/:nodeId/:sensorId')
  .get(fetchOneExtinguisher);

router
  .route('/detectors')
  .get(fetchAllDetectors);

router
  .route('/detector/:nodeId/:sensorId')
  .get(fetchOneDetector);

module.exports = router;
