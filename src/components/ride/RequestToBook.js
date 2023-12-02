import React from "react";
import "./RequestToBook.css";
import { BsCalendarCheck } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const RequestToBook = () => {
  const location = useLocation();
  const { searchCriteria, selectedRide } = location.state || {};

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
      <h2>
        Ride Details <FaCar style={{ color: "#98ed64" }} />
      </h2>

      <div
        className="request-to-book-container4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          textDecoration: "none",
        }}
      >
        <div>
          <GrLocationPin style={{ marginRight: "5px", color: "#f04925" }} />
          {searchCriteria?.source}
        </div>{" "}
        <div>
          <GrLocationPin style={{ marginRight: "5px", color: "#f04925" }} />
          {searchCriteria?.destination}
        </div>
      </div>

      <div className="request-to-book">
        <div>
          <strong style={{ color: "#8E8E8E" }}>
            Date-Time <MdOutlineDateRange style={{ color: "#f04925" }} />
          </strong>{" "}
        </div>{" "}
        <div>
          <strong>{searchCriteria?.dateTime}</strong>
        </div>
        <div>
          <strong style={{ color: "#8E8E8E" }}>
            Total price for 1 passenger{" "}
            <HiOutlineCurrencyDollar
              style={{ color: "#f04925", fontWeight: "bold" }}
            />
          </strong>{" "}
        </div>{" "}
        <div>
          <strong>{selectedRide?.price_per_seat}</strong>
        </div>
        <div>
          <strong style={{ color: "#8E8E8E" }}>
            No of seats available{" "}
            <MdOutlineAirlineSeatReclineNormal style={{ color: "#f04925" }} />
          </strong>{" "}
        </div>{" "}
        <div>
          <strong>{selectedRide?.seats_available}</strong>
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
          Your booking will be confirmed immediately
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
