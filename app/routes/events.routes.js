const { Router } = require('express');

/* Validations */
const { check } = require('express-validator');
const {
  validateFields,
  validateJWT,
} = require('../middlewares');

/* Controller */
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers');

const router = Router();

router.get('/', validateJWT, getEvents);

router.post(
  '/create',
  [
    validateJWT,
    check('title', 'Title is required').notEmpty(),
    check('start', 'Start date is required').notEmpty(),
    check('end', 'End date is required').notEmpty(),
    check('user', 'User is required').isMongoId(),
    validateFields,
  ],
  createEvent
);

router.put(
  '/:uid',
  [
    validateJWT,
    check('title', 'Title is required').notEmpty(),
    check('start', 'Start date is required').notEmpty(),
    check('end', 'End date is required').notEmpty(),
    validateFields,
  ],
  updateEvent
);

router.delete('/:uid', validateJWT, deleteEvent);

module.exports = router;
