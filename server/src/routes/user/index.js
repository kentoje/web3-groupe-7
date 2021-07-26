const { Router } = require('express');
const { signIn, register } = require('@service/userController');

const router = Router();

router
  .route('/sign_in')
  .post(signIn);

router
  .route('/register')
  .post(register);


router
  .route('*')
  .get((_, res) => {
    res.redirect(301, '/api/');
  });

module.exports = router;
