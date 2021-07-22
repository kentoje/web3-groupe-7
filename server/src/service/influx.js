const csv = require('csvtojson');
const { enhancedPromiseHandler } = require('@lib/handler');
const { keep } = require('@lib/format');
const queries = require('@service/query');
const axiosInstance = require('@config/axios');

const keepFields = keep(
  '_start',
  '_stop',
  '_time',
  '_value',
  '_measurement',
  'nodeID',
  'topic',
  'sensorId',
  'isActive',
);

const AREAS = [
  'S_COULOIR',
  'S_VEIL',
  'S_ALLAIS',
  'S_DELBO',
  'S_FORMATION_CONTINUE',
  'S_OMNISPORT',
  'S_GYMNASE',
];

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

    return;
  }

  const arr = (await csv({ checkType: true }).fromString(resolve.data)).map(keepFields);

  res.json({
    data: arr,
    status: 200,
  });
};

const fetchById = async (req, res) => {
  if (!req.query.name) {
    res.json({
      status: 400,
      message: 'You must provide a value to the \'name\' query parameter.',
    });

    return;
  }

  if (!AREAS.includes(req.query.name)) {
    res.json({
      status: 400,
      message: `The area '${req.query.name}' does not exist.`,
    });

    return;
  }

  const promise = axiosInstance({
    method: 'post',
    data: queries.getById(req),
  });

  const [error, resolve] = await enhancedPromiseHandler(promise);
  if (error) {
    res.json({
      status: error.response.status,
      message: error.message,
    });

    return;
  }

  const arr = (await csv({ checkType: true }).fromString(resolve.data)).map(keepFields);

  res.json({
    data: arr,
    status: 200,
  });
};

module.exports = {
  fetchAll,
  fetchById,
};
