import  { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Paper, TextField, Button } from "@mui/material";
import { PlusCircle } from "lucide-react";

const EventForm = ({ token, fetchEvents, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObj = new Date(selectedDate);
    const [hours, minutes] = time.split(':');
    dateObj.setHours(parseInt(hours), parseInt(minutes));

    await axios.post(
      "http://localhost:5000/api/events",
      { 
        title, 
        description, 
        dateTime: dateObj.toISOString() 
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchEvents();
    setTitle("");
    setDescription("");
    setTime("12:00");
  };

  return (
    <Paper className="event-form" elevation={0}>
      <div className="event-form-title">
        <PlusCircle size={20} />
        Create New Event
      </div>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          variant="outlined"
          className="custom-input"
          sx={{ mb: 3 }}
          placeholder="Enter event title"
        />
        
        <TextField
          label="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          className="custom-input"
          sx={{ mb: 3 }}
          placeholder="Enter event description"
        />

        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />
        
        <Button 
          className="custom-button"
          type="submit"
        >
          Create Event
        </Button>
      </form>
    </Paper>
  );
};

EventForm.propTypes = {
  token: PropTypes.string.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
};

export default EventForm;