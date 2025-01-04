import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Login from "./components/Login";
import Register from "./components/Register";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EditEventDialog from "./components/EditEventDialog";
import { Container, Typography, Button } from "@mui/material";
import { Calendar as CalendarIcon } from "lucide-react";
import "./App.css";

const localizer = momentLocalizer(moment);

function App() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(response.data);
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEvents();
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    await axios.put(
      `http://localhost:5000/api/events/${updatedEvent._id}`,
      {
        title: updatedEvent.title,
        description: updatedEvent.description,
        dateTime: updatedEvent.dateTime,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchEvents();
    setEditingEvent(null);
  };

  const handleLogout = () => {
    setToken("");
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  };

  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  return (
    <div className="app-container">
      {!token ? (
        <div className="auth-container fade-in">
          <Register />
          <Login setToken={setToken} />
        </div>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <div className="header fade-in">
            <div className="logo-section">
              <CalendarIcon size={32} className="calendar-icon" />
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                My Calendar
              </Typography>
            </div>
            <Button
              className="custom-button"
              onClick={handleLogout}
              sx={{ ml: "auto" }}
            >
              Logout
            </Button>
          </div>

          <div className="main-content fade-in">
            <EventForm
              token={token}
              fetchEvents={fetchEvents}
              selectedDate={selectedDate}
            />

            <div className="calendar-wrapper">
              <Calendar
                localizer={localizer}
                events={events.map((event) => ({
                  id: event._id,
                  title: event.title,
                  start: new Date(event.dateTime),
                  end: new Date(event.dateTime),
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectSlot={handleSelectSlot}
                selectable
                dayPropGetter={(date) =>
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                    ? { style: { backgroundColor: "#f1f5f9" } }
                    : null
                }
              />
            </div>

            <EventList
              events={events}
              deleteEvent={deleteEvent}
              onEditEvent={handleEditEvent}
            />

            <EditEventDialog
              event={editingEvent}
              open={!!editingEvent}
              onClose={() => setEditingEvent(null)}
              onSave={handleUpdateEvent}
            />
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
