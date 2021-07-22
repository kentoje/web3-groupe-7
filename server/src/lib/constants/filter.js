const QUERY_PARAMETERS = {
  byArea: ['area'],
  allSortByDate: ['groupBy', 'sortBy'],
  oneBySensorAndArea: ['area', 'sensor', 'sortBy'],
};

const POSSIBLE_COMBINATIONS = [
  QUERY_PARAMETERS.byArea,
  QUERY_PARAMETERS.allSortByDate,
  QUERY_PARAMETERS.oneBySensorAndArea,
  [...QUERY_PARAMETERS.allSortByDate, 'desc'],
  [...QUERY_PARAMETERS.oneBySensorAndArea, 'desc'],
];

module.exports = {
  QUERY_PARAMETERS,
  POSSIBLE_COMBINATIONS,
};
