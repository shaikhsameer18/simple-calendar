import PropTypes from "prop-types";
import { Paper, Button } from "@mui/material";
import { Clock, Trash2, Edit } from "lucide-react";

const EventList = ({ events, deleteEvent, onEditEvent }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <Paper key={event._id} className="event-card" elevation={0}>
          <div className="event-header">
            <div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-time">
                <Clock size={14} />
                {new Date(event.dateTime).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                className="edit-button"
                onClick={() => onEditEvent(event)}
                startIcon={<Edit size={16} />}
              >
                Edit
              </Button>
              <Button
                className="delete-button"
                onClick={() => deleteEvent(event._id)}
                startIcon={<Trash2 size={16} />}
              >
                Delete
              </Button>
            </div>
          </div>
        </Paper>
      ))}

      {events.length === 0 && (
        <div className="no-events">No events scheduled yet</div>
      )}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
};

export default EventList;
