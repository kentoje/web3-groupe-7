/* eslint-disable dot-notation */

const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/query',
});

axiosInstance.defaults.headers['Authorization'] = `Token ${process.env.INFLUX_TOKEN_API}`;
axiosInstance.defaults.headers['Content-type'] = 'application/vnd.flux';
axiosInstance.defaults.headers['Accept'] = 'application/json';

module.exports = axiosInstance;
