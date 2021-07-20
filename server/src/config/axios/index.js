const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.example.com',
});

module.exports = instance;
