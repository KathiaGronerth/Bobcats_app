import React from "react";
import "./RequestToBook.css";
import { BsCalendarCheck } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrLocationPin } from "react-icons/gr";

const RequestToBook = () => {
  const bookingDetails = {
    name: "John Doe",
    day: "Mon",
    date: "Nov 27",
    sourceLocation: "Austin",
    destinationLocation: "San Jose",
    pricePerPassenger: "$50",
    seats_available: 3,
  };

  const handleRequestToBook = () => {
    // Implement your logic for handling the request to book
    alert("Request to book submitted!");
  };

  return (
    <div className="request-to-book-main-container">
      <h2>Ride Details</h2>

      <div
        className="request-to-book-container3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          textDecoration: "none",
        }}
      >
        <div>
          <strong style={{ fontSize: "22px" }}>
            <GrLocationPin style={{ marginRight: "5px" }} />
            {bookingDetails.sourceLocation}
          </strong>{" "}
        </div>{" "}
        <div>
          <strong style={{ fontSize: "22px" }}>
            <GrLocationPin style={{ marginRight: "5px" }} />
            {bookingDetails.destinationLocation}
          </strong>
        </div>
      </div>

      <div className="request-to-book">
        <div>
          <strong style={{ color: "#8E8E8E" }}>Date-Time</strong>{" "}
        </div>{" "}
        <div>
          <strong>{bookingDetails.date}</strong>
        </div>
        <div>
          <strong style={{ color: "#8E8E8E" }}>
            Total price for 1 passenger
          </strong>{" "}
        </div>{" "}
        <div>
          <strong>{bookingDetails.pricePerPassenger}</strong>
        </div>
        <div>
          <strong style={{ color: "#8E8E8E" }}>No of seats available</strong>{" "}
        </div>{" "}
        <div>
          <strong>{bookingDetails.seats_available}</strong>
        </div>
      </div>

      <div className="request-to-book-container2">
        <Link
          to="/user-profile"
          style={{
            display: "flex",
            justifyContent: "space-between",
            textDecoration: "none",
          }}
        >
          <div>
            <strong style={{ color: "#00aff5" }}>View Driver's Profile</strong>
          </div>
          <div>
            <strong style={{ color: "#054957" }}>
              <FaArrowRight style={{ fontSize: "18px" }} />
            </strong>
          </div>
        </Link>
      </div>

      <div className="request-to-book-container2">
        <Link
          to="/chat"
          style={{
            display: "flex",
            justifyContent: "space-between",
            textDecoration: "none",
          }}
        >
          <div>
            <strong style={{ color: "#00aff5" }}>
              <IoChatbubblesOutline /> Contact {bookingDetails.name}
            </strong>
          </div>
          <div>
            <strong style={{ color: "#054957" }}>
              <FaArrowRight style={{ fontSize: "18px" }} />
            </strong>
          </div>
        </Link>
      </div>

      <div
        className="request-to-book-container3"
        style={{ paddingBottom: "90px" }}
      >
        <div style={{ fontSize: "14px" }}>
          <BsCalendarCheck style={{ color: "#98ed64", marginRight: "5px" }} />{" "}
          Your booking won't be confirmed until the driver approves your request
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <button>
          <BsCalendarCheck style={{ marginRight: "5px" }} />
          Request to Book
        </button>
      </div>
    </div>
  );
};

export default RequestToBook;
