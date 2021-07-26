const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: 'Authorization token is not set',
      status: 403,
    });

    return;
  }

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(500).json({
        message: error.message,
        status: 500,
      });

      return;
    }

    if (!decoded) {
      res.status(403).json({
        message: 'Unauthorized',
        status: 403,
      });
    }

    next();
  });
};

module.exports = {
  checkAuth,
};
