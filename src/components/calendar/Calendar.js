import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import RRule from "rrule-alt";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

// Function to create a unique ID for each event
const createEventId = () => String(Math.random().toString(36).substr(2, 9));

// Function to generate recurring events using RRule
const generateRecurringEvents = (
  title,
  daysOfWeek,
  startTime,
  endTime,
  untilDate
) => {
  const rule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: daysOfWeek,
    dtstart: new Date(),
    until: new Date(untilDate),
    byhour: startTime.getHours(),
    byminute: startTime.getMinutes(),
    bysecond: 0,
  });

  const occurrences = rule.all();
  return occurrences.map((occurrence) => ({
    id: createEventId(),
    title,
    start: occurrence.toISOString(),
    end: new Date(occurrence.getTime() + (endTime - startTime)),
    allDay: false,
  }));
};

// Demo data for existing events
const DEMO_EVENTS = [
  {
    id: createEventId(),
    title: "Therapy Dogs",
    start: new Date("2023-12-05T12:00:00").toISOString(),
    end: new Date("2023-12-05T14:00:00").toISOString(),
    allDay: false,
    destination: "Texas State University, University Drive, San Marcos, TX",
    destination_coordinates: {
      lat: 29.888057687626,
      lng: -97.9383831914355,
    },
  },

  {
    id: createEventId(),
    title: "Texas State Women's Basketball Vs Oklahoma State",
    start: new Date("2023-12-09T14:00:00").toISOString(),
    end: new Date("2023-12-09T16:00:00").toISOString(),
    allDay: false,
    destination: "Bobcat Stadium",
    destination_coordinates: {
      lat: 29.89124822797564,
      lng: -97.9255701257591,
    },
  },
  {
    id: createEventId(),
    title: "Texas State Men's Basketball at James Madison",
    start: new Date("2023-12-30T13:00:00").toISOString(),
    end: new Date("2023-12-30T15:00:00").toISOString(),
    allDay: false,
    destination: "Bobcat Stadium",
    destination_coordinates: {
      lat: 38.43529359577231,
      lng: -78.86986211736144,
    },
  },
  {
    id: createEventId(),
    title: "Exhibition-Lonesome Dove Collection",
    start: new Date("2023-12-06T09:00:00").toISOString(),
    end: new Date("2023-12-06T12:00:00").toISOString(),
    allDay: false,
    destination: "Texas State University, University Drive, San Marcos, TX",
    destination_coordinates: {
      lat: 29.888057687626,
      lng: -97.9383831914355,
    },
  },

  // Add more demo events as needed
];
// Demo data for recurring events (courses)
const DEMO_COURSE_EVENTS = [
  ...generateRecurringEvents(
    "Math 101",
    [RRule.MO, RRule.WE, RRule.FR],
    new Date(2023, 0, 15, 9, 0),
    new Date(2023, 0, 15, 10, 30),
    new Date(2023, 11, 31)
  ),
  ...generateRecurringEvents(
    "History 202",
    [RRule.TU, RRule.TH],
    new Date(2023, 0, 16, 11, 0),
    new Date(2023, 0, 16, 12, 30),
    new Date(2023, 11, 31)
  ),
  // Add more demo events as needed
];

const ALL_DEMO_EVENTS = [...DEMO_EVENTS, ...DEMO_COURSE_EVENTS];

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableContinue, setDisableContinue] = useState(true);
  const today = new Date();

  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDisableContinue(false);
  };

  const handleContinue = () => {
    switch (selectedOption) {
      case "Reserve a ride":
        handleBookRide();
        break;
      case "Delete the event":
        handleDeleteEvent();
        break;
      default:
        break;
    }
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setIsModalOpen(true);
    setSelectedEvent(clickInfo.event);
    setSelectedOption(null);
    setDisableContinue(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      if (
        window.confirm(
          `Are you sure you want to delete the event '${selectedEvent.title}'?`
        )
      ) {
        selectedEvent.remove();
        closeModal();
      }
    }
  };

  const handleBookRide = () => {
    if (selectedEvent) {
      console.log("Selected Event:", selectedEvent);

      const { start, extendedProps } = selectedEvent;

      if (extendedProps) {
        const { destination, destination_coordinates } = extendedProps;

        // Format start date in CST timezone
        const formattedStartDate = start.toLocaleString("en-US", {
          timeZone: "America/Chicago", // Central Standard Time
        });

        console.log("calendar_start", formattedStartDate);
        console.log("Destination", destination);
        console.log("Destination Coordinates", destination_coordinates);

        // Navigate to "/find-ride-form" and pass information as state
        navigate("/find-ride-form", {
          state: {
            calendar_start: formattedStartDate,
            calendar_destination: destination,
            calendar_destination_coordinates: destination_coordinates,
          },
        });

        closeModal();
      } else {
        console.error(
          "Extended props not found in selectedEvent:",
          selectedEvent
        );
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebarEvent = (event) => (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  const renderSidebar = () => (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          Toggle Weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <div
          style={{
            color: "#054957",
            fontWeight: "bold",
            fontSize: "18px",
            margin: "5px",
          }}
        >
          All Events ({currentEvents.length})
        </div>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <div className="demo-app">
        {renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={DEMO_EVENTS} // Use the demo data for courses
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            validRange={{
              start: today,
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Options"
        overlayClassName="modal-overlay"
        className="modal"
      >
        <h2>What would you like to do?</h2>
        <div
          className={`modal-options ${
            selectedOption === "Reserve a ride" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("Reserve a ride")}
        >
          Reserve a ride
        </div>
        <div
          className={`modal-options ${
            selectedOption === "Delete the event" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("Delete the event")}
        >
          Delete the event
        </div>
        <div className="button-container">
          <button onClick={closeModal}>Cancel</button>
          <button
            onClick={handleContinue}
            disabled={disableContinue}
            style={{
              backgroundColor: disableContinue ? "lightgray" : "#00aff5",
            }}
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
}
export { DEMO_EVENTS, DEMO_COURSE_EVENTS };