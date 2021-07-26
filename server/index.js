require('dotenv').config();
require('module-alias/register');
const express = require('express');
const apiRouter = require('@routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.get('*', (_, res) => {
  res.redirect(301, '/api/');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
});
