import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Edit2 } from "lucide-react";

const EditEventDialog = ({ event, open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      const eventTime = new Date(event.dateTime);
      setTime(
        `${eventTime.getHours().toString().padStart(2, "0")}:${eventTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateObj = new Date(event.dateTime);
    const [hours, minutes] = time.split(":");
    dateObj.setHours(parseInt(hours), parseInt(minutes));

    onSave({
      ...event,
      title,
      description,
      dateTime: dateObj.toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        <Edit2 size={20} style={{ marginRight: "0.5rem" }} />
        Edit Event
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            variant="outlined"
            className="custom-input"
            sx={{ mb: 3 }}
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
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" className="custom-button">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditEventDialog.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditEventDialog;
