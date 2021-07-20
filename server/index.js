const express = require('express');
const influxRouter = require('./src/routes/influxQuery');

const app = express();

app.use('/influx', influxRouter);

app.listen(8888, () => {
  console.log('Listening on port 8888 at http://localhost:8888');
});
