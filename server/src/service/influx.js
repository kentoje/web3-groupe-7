const csv = require('csvtojson');
const { enhancedPromiseHandler } = require('@lib/handler');
const { keep } = require('@lib/format');
const queries = require('@service/query');
const axiosInstance = require('@config/axios');
const { FORMAT_FIELDS } = require('@lib/constants');
const { QUERY_PARAMETERS, POSSIBLE_COMBINATIONS } = require('@lib/constants/filter');
const { sortByStr, isDeeplyEqual } = require('@lib/string');
const validatorsObj = require('@service/validators');
const { coordinates, pickCoordinates } = require('@lib/mocks/coordinates');

const scenarios = [
  {
    queryParams: QUERY_PARAMETERS.byArea,
    query: (req) => queries.getByArea(req),
    validators: Object.entries(validatorsObj)
      .reduce((accu, [key, fn]) => (
        QUERY_PARAMETERS.byArea.includes(key) ? { ...accu, [key]: fn } : { ...accu }
      ), {}),
  },
  {
    queryParams: QUERY_PARAMETERS.allSortByDate,
    query: (req) => queries.getAllSortByDate(req),
    validators: Object.entries(validatorsObj)
      .reduce((accu, [key, fn]) => (
        [
          ...QUERY_PARAMETERS.allSortByDate,
          'desc',
        ].includes(key) ? { ...accu, [key]: fn } : { ...accu }
      ), {}),
  },
  {
    queryParams: QUERY_PARAMETERS.oneBySensorAndArea,
    query: (req) => queries.getBySensorAndArea(req),
    validators: Object.entries(validatorsObj)
      .reduce((accu, [key, fn]) => (
        [
          ...QUERY_PARAMETERS.oneBySensorAndArea,
          'desc',
        ].includes(key) ? { ...accu, [key]: fn } : { ...accu }
      ), {}),
  },
];

const pickScenario = (req) => scenarios.find((scenario) => (
  isDeeplyEqual(
    sortByStr(scenario.queryParams),
    sortByStr(Object.keys(req.query).filter((key) => key !== 'desc')),
  )
));

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

  const arr = (await csv({ checkType: true }).fromString(resolve.data)).map(keep(...FORMAT_FIELDS));

  res.json({
    data: arr.map((node) => ({
      ...node,
      coordinates: pickCoordinates(node.topic),
    })),
    status: 200,
  });
};

const fetchFilter = async (req, res) => {
  if (
    !POSSIBLE_COMBINATIONS
      .map(sortByStr)
      .some((arr) => isDeeplyEqual(arr, sortByStr(Object.keys(req.query))))
  ) {
    res.json({
      status: 400,
      message: 'This query parameters combination is not allowed.',
      allowedCombinations: POSSIBLE_COMBINATIONS,
    });

    return;
  }

  const { query, validators } = pickScenario(req);

  const arrErrors = Object.entries(req.query)
    .map(([key, value]) => validators[key](value))
    .filter(Boolean);

  if (arrErrors.length) {
    res.json({
      status: 400,
      messages: arrErrors.map((error) => error.message.replace(/\n/gi, ' ').trim()),
    });

    return;
  }

  const promise = axiosInstance({
    method: 'post',
    data: query(req),
  });

  const [error, resolve] = await enhancedPromiseHandler(promise);
  if (error) {
    res.json({
      status: error.response.status,
      message: error.message,
    });

    return;
  }

  const arr = (await csv({ checkType: true }).fromString(resolve.data)).map(keep(...FORMAT_FIELDS));

  res.json({
    data: arr,
    status: 200,
  });
};

module.exports = {
  fetchAll,
  fetchFilter,
};
