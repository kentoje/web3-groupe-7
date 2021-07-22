const { FORMAT_FIELDS, SENSORS, AREAS } = require('@lib/constants');

const validators = {
  area: (str) => (
    !AREAS.includes(str)
    && new Error(`Area must be one of: ${AREAS.reduce((accu, area) => `${accu}${area}\n`, '\n')}`)
  ),
  sensor: (str) => (
    !SENSORS.includes(str)
    && new Error(`Sensor must be one of: ${SENSORS.reduce((accu, sensor) => `${accu}${sensor}\n`, '\n')}`)
  ),
  groupBy: (str) => (
    !FORMAT_FIELDS.includes(str)
    && new Error(`groupBy must be one of: ${FORMAT_FIELDS.reduce((accu, field) => `${accu}${field}\n`, '\n')}`)
  ),
  sortBy: (str) => (
    !FORMAT_FIELDS.includes(str)
    && new Error(`sortBy must be one of: ${FORMAT_FIELDS.reduce((accu, field) => `${accu}${field}\n`, '\n')}`)
  ),
  desc: () => {},
};

module.exports = validators;
