const { Router } = require('express');

/* Validations */
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');

/* Controller */
const { signIn, login } = require('../controllers');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/signin',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  signIn
);

module.exports = router;
