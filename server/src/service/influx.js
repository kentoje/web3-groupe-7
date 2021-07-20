const axios = require('axios');
const csv = require('csvtojson');
const { enhancedPromiseHandler } = require('../lib/error');

const fetchAll = async (_, res) => {
  const promise = axios.post(
    'https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/query',
    `
      import "regexp"
      import "json"

      from(bucket: "kento.monthubert's Bucket")
        |> range(start: -30d)
        |> filter(fn: (r) => r["topic"] == "WEB3-GROUPE7/4574379/121" or r["topic"] == "WEB3-GROUPE7/4863786/119")
        |> filter(fn: (r) => r["_field"] == "data_value")
        |> map(fn: (r) => ({ r with
          response: string(v: json.encode(v: { "sensor_id": regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2], "value": r._value, time: r["_time"] }))}))
        |> keep(columns: ["response"])
        |> sort(columns: ["response"], desc: true)
      `,
    {
      headers: {
        Authorization: 'Token 1PxRhvLzcb1mxmWuRfCRjV0vbuxXKE5Qp_sZhrnpk8_kC4-2_vl8jOn2ZQ7Nxo2ml60fTSSU5jNzzh6hkHuadQ==',
        Accept: 'application/json',
        'Content-type': 'application/vnd.flux',
      },
    },
  );

  const [error, resolve] = await enhancedPromiseHandler(promise);
  if (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }

  const arr = await csv().fromString(resolve.data);

  res.json({
    data: arr.flatMap(({ response }) => JSON.parse(response)),
    status: 200,
  });
};

module.exports = {
  fetchAll,
};
