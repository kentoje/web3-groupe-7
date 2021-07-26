const { enhancedPromiseHandler } = require('@lib/handler');
const { promisifyVerify } = require('@lib/promise/auth');

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: 'Authorization token is not set',
      status: 403,
    });

    return;
  }

  const [error] = await enhancedPromiseHandler(promisifyVerify(
    req.headers.authorization,
    process.env.JWT_SECRET,
  ));
  if (error) {
    res.status(error.status).json({
      message: error.message,
      status: error.status,
    });

    return;
  }

  next();
};

module.exports = {
  checkAuth,
};
