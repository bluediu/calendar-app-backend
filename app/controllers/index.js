const {
  signIn,
  login,
  renewToken,
} = require('./auth.controller');

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
  renewToken,

  /* Events */
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
