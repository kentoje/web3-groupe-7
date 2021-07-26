require('dotenv').config();
require('module-alias/register');
const express = require('express');
const influxRouter = require('@routes/influxQuery');
const root = require('@routes/root');
const databaseRouter = require('@routes/database');
const { connect } = require('@config/database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/', root);
app.use('/api/influx', influxRouter);
app.use('/api/details', connect(databaseRouter));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
});
