require('dotenv').config();
require('module-alias/register');
const express = require('express');
const influxRouter = require('@routes/influxQuery');

const app = express();

// TODO: /api/influx
app.use('/influx', influxRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
});
