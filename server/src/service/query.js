const queries = {
  getAll: () => `
    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> drop(columns: ["field1", "result", "table", "_field"])
      |> last()
  `,
  getById: (req) => `
    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> filter(fn: (r) => r["nodeID"] == "${req.query.name}")
      |> last()
  `,
};

module.exports = queries;
