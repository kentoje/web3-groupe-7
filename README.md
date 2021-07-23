# API

## Routes

| route                                                                     | description                                                                                                                         |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/api/influx/`                                                            | GET All data from sensors in all nodes.                                                                                             |
| `/api/influx/filter?area={area}`                                          | GET All data of sensors from a given area.                                                                                          |
| `/api/influx/filter?groupBy={field}&sortBy={field}&desc={bool}`           | GET All, group data by given field, and sort by given field. Desc is `true` by default, it can be omitted.                          |
| `/api/influx/filter?area={area}&sensor={sensor}&sortBy={field}&desc=true` | GET All data from a given sensor and a given area. Sort the result by the given field. Desc is `true` by default, it can be omitted |

## ENV

| key                | value                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `INFLUX_TOKEN_API` | 1PxRhvLzcb1mxmWuRfCRjV0vbuxXKE5Qp_sZhrnpk8_kC4-2_vl8jOnhebdjzhbdjz60fTSSU5jNzzh6hkHuadQ==                     |
| `PORT`             | 8888                                                                                                          |
| `DB_URI`           | 'mongodb+srv://{username}:{password}@fireforce-data.xl1rd.mongodb.net/{database}?retryWrites=true&w=majority' |

## Constants

### Areas

```js
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
```

### Sensors

```js
const SENSORS = [
  'Flexibility',
  'Proximity',
  'Luminosity',
];
```

### Format fields

```js
const FORMAT_FIELDS = [
  '_time',
  '_value',
  '_measurement',
  'nodeID',
  'topic',
  'sensorId',
  'isActive',
];
```
