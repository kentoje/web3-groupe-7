const queries = {
  getAll: () => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> map(fn: (r) => ({ r with
        sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
        isActive: if r["_measurement"] == "Luminosity" and r["_value"] > 195000 then bool(v: "true")
          else if r["_value"] == 1 then bool(v: "true")
          else bool(v: "false")
      }))
      |> last()
  `,
  getById: (req) => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> filter(fn: (r) => r["nodeID"] == "${req.query.name}")
      |> map(fn: (r) => ({ r with
        sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
        isActive: if r["_measurement"] == "Luminosity" and r["_value"] > 195000 then true
          else if r["_value"] == 1 then true
          else false
      }))
      |> last()
  `,
};

module.exports = queries;
