const { response } = require('express');
const jwt_decode = require('jwt-decode');

const { Event } = require('../models');

const getEvents = async (_, res = response) => {
  const events = await Event.find().populate('user', 'name');

  return res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    const eventSaved = await event.save();

    return res.json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk to administrador',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const token = req.header('x-token');
  const eventId = req.params.uid;

  try {
    // Decode user JWT
    const decodedToken = jwt_decode(token);

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'This event does not exists with that ID',
      });
    }

    if (event.user.toString() !== decodedToken.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not privilege to update this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: eventId,
    };

    const eventUpdated = await Event.findByIdAndUpdate(
      eventId,
      newEvent,
      { new: true }
    );

    return res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk to administrador',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const token = req.header('x-token');
  const eventId = req.params.uid;

  try {
    // Decode user JWT
    const decodedToken = jwt_decode(token);

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'This event does not exists with that ID',
      });
    }

    if (event.user.toString() !== decodedToken.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not privilege to update this event',
      });
    }

    await Event.findByIdAndDelete(eventId);

    return res.json({ ok: true, msg: 'event deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk to administrador',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
