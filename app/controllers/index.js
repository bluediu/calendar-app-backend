const { signIn, login } = require('./auth.controller');

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('./events.controller');

module.exports = {
  /* Auth */
  signIn,
  login,

  /* Events */
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
