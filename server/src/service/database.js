const Extinguisher = require('@lib/models/extinguisher');
const SmokeDetector = require('@lib/models/smokedetector');

const fetchAll = async (req, res) => {
  const Extinguishers = await Extinguisher.find().exec();
  const smokeDetectors = await SmokeDetector.find().exec();
  res.send({ Extinguishers, smokeDetectors });
};

const fetchOne = async (req, res) => {
  const { topic } = req.params;
  const item = await Promise.all([
    Extinguisher.find({ topic }),
    SmokeDetector.find({ topic }),
  ]);
  res.send(item.flat());
};

module.exports = {
  fetchAll,
  fetchOne,
};
