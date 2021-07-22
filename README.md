# API

## Routes

| route                          | description                                 |
| ------------------------------ | ------------------------------------------- |
| `/api/influx`                  | GET All data from sensors in all nodes      |
| `/api/influx/area?name={name}` | GET All data from sensors from a given node |

## ENV

| key                | value                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `INFLUX_TOKEN_API` | 1PxRhvLzcb1mxmWuRfCRjV0vbuxXKE5Qp_sZhrnpk8_kC4-2_vl8jOnhebdjzhbdjz60fTSSU5jNzzh6hkHuadQ==                     |
| `PORT`             | 8888                                                                                                          |
| `DB_URI`           | 'mongodb+srv://{username}>:{password}>@fireforce-data.xl1rd.mongodb.net/{database}>?retryWrites=true&w=majority' |
