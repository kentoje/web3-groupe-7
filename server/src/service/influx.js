const csv = require('csvtojson');
const { enhancedPromiseHandler } = require('@lib/handler');
const { keep } = require('@lib/format');
const queries = require('@service/query');
const axiosInstance = require('@config/axios');

const fetchAll = async (_, res) => {
  const promise = axiosInstance({
    method: 'post',
    data: queries.getAll(),
  });

  const [error, resolve] = await enhancedPromiseHandler(promise);
  if (error) {
    res.json({
      status: error.response.status,
      message: error.message,
    });
  }

  const arr = await (await csv().fromString(resolve.data)).map(keep(
    '_start',
    '_stop',
    '_time',
    '_value',
    '_measurement',
    'nodeID',
    'topic',
  ));

  res.json({
    data: arr,
    status: 200,
  });
};

module.exports = {
  fetchAll,
};
