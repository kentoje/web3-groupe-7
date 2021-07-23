const FORMAT_FIELDS = [
  '_time',
  '_value',
  '_measurement',
  'name',
  'nodeId',
  'topic',
  'sensorId',
  'isActive',
];

const AREAS = [
  'TERASSE',
  'EPHEMERE',
  'GRAPPIN',
  'ZAZZO',
  'CENTRE_SPORTIF',
  'BU',
  'LEFEBVRE_ROUCH',
  'LA_COMTEMPORAINE',
  'MAISON_DE_L_ETUDIANT',
  'RESTO_CROUS',
  'VEIL',
  'OMNISPORT',
  'GYMNASE',
];

const SENSORS = [
  'Flexibility',
  'Proximity',
  'Luminosity',
];

module.exports = {
  AREAS,
  FORMAT_FIELDS,
  SENSORS,
};
