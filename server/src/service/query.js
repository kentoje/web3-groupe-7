const queries = {
  getAll: () => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> map(fn: (r) => ({ r with
        sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
        nodeId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[1]),
        isActive: if r["_measurement"] == "Luminosity" and r["_value"] > 195000 then bool(v: "true")
          else if r["_value"] == 1 then bool(v: "true")
          else bool(v: "false")
      }))
      |> last()
  `,
  getByArea: (req) => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> filter(fn: (r) => r["name"] == "${req.query.area}")
      |> map(fn: (r) => ({ r with
        sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
        nodeId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[1]),
        isActive: if r["_measurement"] == "Luminosity" and r["_value"] > 195000 then true
          else if r["_value"] == 1 then true
          else false
      }))
      |> last()
  `,
  getAllSortByDate: (req) => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "Flexibility" or r["_measurement"] == "Luminosity" or r["_measurement"] == "Proximity")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> map(fn: (r) => ({ r with
          sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
          nodeId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[1]),
          isActive: if r["_measurement"] == "Luminosity" and r["_value"] > 195000 then true
            else if r["_value"] == 1 then true
            else false
      }))
      |> group(columns: ["${req.query.groupBy}"], mode: "by")
      |> sort(columns: ["${req.query.sortBy}"], desc: ${req.query.desc || 'true'})
  `,
  getBySensorAndArea: (req) => `
    import "regexp"

    from(bucket: "kento.monthubert's Bucket")
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "${req.query.sensor}")
      |> filter(fn: (r) => r["name"] == "${req.query.area}")
      |> filter(fn: (r) => r["_field"] == "data_value")
      |> map(fn: (r) => ({ r with
        sensorId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[2]),
        nodeId: string(v: regexp.splitRegexp(r: /\\//, v: r["topic"], i: -1)[1]),
        isActive: if r["_measurement"] == "${req.query.sensor}" and r["_value"] > 195000 then true
          else if r["_measurement"] == "${req.query.sensor}" and r["_value"] == 1 then true
          else if r["_measurement"] == "${req.query.sensor}" and r["_value"] == 1 then true
          else false
      }))
      |> sort(columns: ["${req.query.sortBy}"], desc: ${req.query.desc || 'true'})
  `,
};

module.exports = queries;
