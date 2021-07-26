const Extinguisher = require('@models/extinguisher');
const SmokeDetector = require('@models/smokeDetector');
const { enhancedPromiseHandler } = require('@lib/handler');

const fetchAllExtinguishers = async (_, res) => {
  const [error, extinguishers] = await enhancedPromiseHandler(Extinguisher.find().lean());
  if (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    data: extinguishers,
    status: 200,
  });
};

const fetchAllDetectors = async (_, res) => {
  const [error, detectors] = await enhancedPromiseHandler(SmokeDetector.find().lean());
  if (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    data: detectors,
    status: 200,
  });
};

const fetchOneExtinguisher = async (req, res) => {
  const { nodeId } = req.params;
  const [error, extinguisher] = await enhancedPromiseHandler(Extinguisher.findOne({ topic: `WEB3-GROUPE7/${nodeId}/119` }).lean());
  if (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    data: extinguisher,
    status: 200,
  });
};

const fetchOneDetector = async (req, res) => {
  const { nodeId } = req.params;
  const [error, detector] = await enhancedPromiseHandler(SmokeDetector.findOne({ topic: `WEB3-GROUPE7/${nodeId}/121` }).lean());
  if (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });

    return;
  }

  res.status(200).json({
    data: detector,
    status: 200,
  });
};

module.exports = {
  fetchAllDetectors,
  fetchAllExtinguishers,
  fetchOneDetector,
  fetchOneExtinguisher,
};
