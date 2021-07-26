/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('@models/user');
const { enhancedPromiseHandler } = require('@lib/handler');

const register = async (req, res) => {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  const [error, user] = await enhancedPromiseHandler(newUser.save());
  if (error) {
    res
      .status(500)
      .json({
        message: error.message,
        status: 500,
      });

    return;
  }

  res.status(201).json({
    data: user,
    status: 201,
  });
};

const signIn = async (req, res) => {
  const [error, user] = await enhancedPromiseHandler(User.findOne({ email: req.body.email }));
  if (error) {
    res
      .status(500)
      .json({
        message: error.message,
        status: 500,
      });

    return;
  }

  if (!user || !bcrypt.compareSync(req.body.password, user.hash_password)) {
    res
      .status(401)
      .json({
        message: 'Authentication failed. Invalid user or password.',
        status: 401,
      });

    return;
  }

  res.status(200).json({
    token: jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
    ),
  });
};

module.exports = {
  signIn,
  register,
};
