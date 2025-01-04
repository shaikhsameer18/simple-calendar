const Event = require("../models/Event");

// Create Event
const createEvent = async (req, res) => {
  const { title, description, dateTime } = req.body;

  if (!title || !dateTime) {
    return res.status(400).send({ message: "Title and dateTime are required" });
  }

  try {
    const event = new Event({
      title,
      description,
      dateTime,
      userId: req.user.userId,
    });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send({ message: "Event creation failed", error });
  }
};

// Get User Events
const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.userId });
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch events", error });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(event);
  } catch (error) {
    res.status(500).send({ message: "Failed to update event", error });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: "Event deleted" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete event", error });
  }
};

module.exports = { createEvent, getUserEvents, updateEvent, deleteEvent };
