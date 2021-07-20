require('dotenv').config();
const express = require('express');
const influxRouter = require('./src/routes/influxQuery');

const app = express();

app.use('/influx', influxRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
});
