/* eslint-disable dot-notation */

const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/query',
});

axiosInstance.defaults.headers['Authorization'] = 'Token 1PxRhvLzcb1mxmWuRfCRjV0vbuxXKE5Qp_sZhrnpk8_kC4-2_vl8jOn2ZQ7Nxo2ml60fTSSU5jNzzh6hkHuadQ==';
axiosInstance.defaults.headers['Content-type'] = 'application/vnd.flux';
axiosInstance.defaults.headers['Accept'] = 'application/json';

module.exports = axiosInstance;
