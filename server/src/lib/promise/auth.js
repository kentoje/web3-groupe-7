const jwt = require('jsonwebtoken');

const promisifyVerify = (authorization, secret) => (
  new Promise((resolve, reject) => {
    jwt.verify(authorization, secret, (error, decoded) => {
      if (error) {
        reject({
          message: error.message,
          status: 500,
        });
      }

      if (!decoded) {
        reject({
          message: 'Unauthorized',
          status: 401,
        });
      }

      resolve(decoded);
    });
  })
);

module.exports = {
  promisifyVerify,
};
