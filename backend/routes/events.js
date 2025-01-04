const express = require("express");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const {
  createEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Create Event
router.post("/", auth, createEvent);

// Get User Events
router.get("/", auth, getUserEvents);

// Update Event
router.put("/:id", auth, updateEvent);

// Delete Event
router.delete("/:id", auth, deleteEvent);

module.exports = router;
