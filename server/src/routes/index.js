const { Router } = require('express');
const documentationRouter = require('@routes/documentation');
const detailsRouter = require('@routes/details');
const influxRouter = require('@routes/influx');
const userRouter = require('@routes/user');
const { connect } = require('@config/database');

const router = Router();

router.use('/', documentationRouter);
router.use('/influx', influxRouter);
router.use('/details', connect(detailsRouter));
router.use('/auth', connect(userRouter));
router.get('*', (_, res) => {
  res.redirect(301, '/api/');
});

module.exports = router;
