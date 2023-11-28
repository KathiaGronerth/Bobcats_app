import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import RRule from "rrule-alt";

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
    title: "Meeting with Client",
    start: new Date().toISOString(),
    end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
    allDay: false,
  },
  {
    id: createEventId(),
    title: "Lunch Break",
    start: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
    end: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours later
    allDay: false,
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

export default class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    return (
      <div className="main-container">
        <div className="demo-app">
          {this.renderSidebar()}
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
              weekends={this.state.weekendsVisible}
              initialEvents={ALL_DEMO_EVENTS} // Use the demo data for courses
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            />
          </div>
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
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
            All Events ({this.state.currentEvents.length})
          </div>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
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

  handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
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
}
