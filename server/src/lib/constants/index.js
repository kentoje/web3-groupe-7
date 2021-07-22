const FORMAT_FIELDS = [
  '_time',
  '_value',
  '_measurement',
  'nodeID',
  'topic',
  'sensorId',
  'isActive',
];

const AREAS = [
  'S_COULOIR',
  'S_VEIL',
  'S_ALLAIS',
  'S_DELBO',
  'S_FORMATION_CONTINUE',
  'S_OMNISPORT',
  'S_GYMNASE',
];

const SENSORS = [
  'Flexibility',
  'Proximity',
  'Luminosity',
];

const QUERY_PARAMETERS = {
  byArea: ['area'],
  allSortByDate: ['groupBy', 'sortBy'],
  oneBySensorAndArea: ['area', 'sensor', 'sortBy'],
};

module.exports = {
  AREAS,
  FORMAT_FIELDS,
  SENSORS,
  QUERY_PARAMETERS,
};
