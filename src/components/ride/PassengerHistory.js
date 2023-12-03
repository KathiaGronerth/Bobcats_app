import React, { useState, useEffect } from "react";
import "./RideHistory.css";
import { GrHistory } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

const ridesHistoryData = {
  driver: [
    {
      id: "c1c124f1-fdab-4bc9-994b-f29b4b201706",
      source: "108 S Austin St, Seguin, TX 78155",
      source_coordinates: {
        lat: -97.9648355,
        lng: 29.5684865,
      },
      destination: "McCoy College of Business, San Marcos, TX",
      destination_coordinates: {
        lat: -97.94466018676758,
        lng: 29.888057687626,
      },
      driver: {
        id: "ee8f7f78-6ece-4164-a5db-bd83e1791766",
        name: "Jaap Stam",
        email: "jsm44@txstate.edu",
        phone: "9118880900",
        has_car: true,
      },
      car: {
        id: "28e985cb-d854-4af6-820e-26a90ef36bd4",
        model: "Accord",
        make: "Honda",
        color: "BLUE",
        year: 2013,
        license_plate: "RAV7800",
      },
      date: "2023-12-14",
      time: "09:00:00",
      seats_available: 3,
      price_per_seat: 15.0,
      distance_in_miles: 22.04,
      time_in_hrs: 0.7095504836440999,
    },
    {
      id: "1ba1ae92-75fa-417a-b351-318ba89441fa",
      source: "McCoy College of Business, San Marcos, TX",
      source_coordinates: {
        lat: -97.94466018676758,
        lng: 29.888057687626,
      },
      destination: "108 S Austin St, Seguin, TX 78155",
      destination_coordinates: {
        lat: -97.9648355,
        lng: 29.5684865,
      },
      driver: {
        id: "ee8f7f78-6ece-4164-a5db-bd83e1791766",
        name: "Jaap Stam",
        email: "jsm44@txstate.edu",
        phone: "9118880900",
        has_car: true,
      },
      car: {
        id: "28e985cb-d854-4af6-820e-26a90ef36bd4",
        model: "Accord",
        make: "Honda",
        color: "BLUE",
        year: 2013,
        license_plate: "RAV7800",
      },
      date: "2023-12-13",
      time: "16:00:00",
      seats_available: 3,
      price_per_seat: 15.0,
      distance_in_miles: 22.04,
      time_in_hrs: 0.7095504836440999,
    },
    {
      id: "b0b9413d-fa6f-4a65-85c1-b9081358665d",
      source: "108 S Austin St, Seguin, TX 78155",
      source_coordinates: {
        lat: -97.9648355,
        lng: 29.5684865,
      },
      destination: "McCoy College of Business, San Marcos, TX",
      destination_coordinates: {
        lat: -97.94466018676758,
        lng: 29.888057687626,
      },
      driver: {
        id: "ee8f7f78-6ece-4164-a5db-bd83e1791766",
        name: "Jaap Stam",
        email: "jsm44@txstate.edu",
        phone: "9118880900",
        has_car: true,
      },
      car: {
        id: "28e985cb-d854-4af6-820e-26a90ef36bd4",
        model: "Accord",
        make: "Honda",
        color: "BLUE",
        year: 2013,
        license_plate: "RAV7800",
      },
      date: "2023-12-13",
      time: "11:00:00",
      seats_available: 3,
      price_per_seat: 15.0,
      distance_in_miles: 22.04,
      time_in_hrs: 0.7095504836440999,
    },
  ],
  passenger: [
    {
      ride: {
        id: "0ea9950e-c5e7-4101-b085-f008b2ad3050",
        source:
          "Texas Bean & Brew House, I 35 N Frontage Rd, San Marcos, TX, USA",
        source_coordinates: {
          lat: -97.91568869999999,
          lng: 29.8880134,
        },
        destination:
          "Austin-Bergstrom International Airport (AUS), Presidential Boulevard, Austin, TX, USA",
        destination_coordinates: {
          lat: -97.6667054,
          lng: 30.1953204,
        },
        driver: {
          id: "b9518b2d-47ed-4937-bbb7-526c998e197a",
          name: "Hunter McBride",
          email: "hmc22@txstate.edu",
          phone: "2122223090",
          has_car: true,
        },
        car: {
          id: "033b3898-3fb0-4833-b320-3f80ad4604c0",
          model: "takoma",
          make: "toyota",
          color: "white",
          year: 2015,
          license_plate: "mcb6354",
        },
        date: "2023-12-27",
        time: "10:19:00",
        seats_available: 2,
        price_per_seat: 15.0,
        distance_in_miles: 25.9,
        time_in_hrs: 0.8335779841364028,
      },
      passenger: {
        id: "68920c45-1832-40d3-a5d8-5823caae84f8",
        name: "Kathia Villavicencio",
        email: "ukw3@txstate.edu",
        phone: "9118880900",
        has_car: false,
      },
    },
    {
      ride: {
        id: "464b3dab-957f-4083-a21b-af0430760fae",
        source: "Texas State University, University Drive, San Marcos, TX, USA",
        source_coordinates: {
          lat: -97.938351,
          lng: 29.888411,
        },
        destination: "Pearl Brewery, Pearl Parkway, San Antonio, TX, USA",
        destination_coordinates: {
          lat: -98.48105129999999,
          lng: 29.4422674,
        },
        driver: {
          id: "e6f146e6-9c9d-4e85-87d8-6078e17e9fad",
          name: "Harry Maguire",
          email: "hmg717@txstate.edu",
          phone: "9118880900",
          has_car: true,
        },
        car: {
          id: "2a0fb34e-412e-431a-adcd-41b493cc6291",
          model: "Accent",
          make: "Honda",
          color: "White",
          year: 2015,
          license_plate: "HAM5555",
        },
        date: "2023-12-27",
        time: "21:52:00",
        seats_available: 2,
        price_per_seat: 15.0,
        distance_in_miles: 44.83,
        time_in_hrs: 1.4430329944753202,
      },
      passenger: {
        id: "68920c45-1832-40d3-a5d8-5823caae84f8",
        name: "Kathia Villavicencio",
        email: "ukw3@txstate.edu",
        phone: "9118880900",
        has_car: false,
      },
    },
  ],
};

const Card = ({ ride }) => {
  return (
    <div className="ride-card">
      <div className="ride-card-container">
        <p className="ride-detail" style={{ fontSize: "16px" }}>
          <IoPerson style={{ paddingRight: "5px" }} /> Driver :{" "}
          {ride.driver.name}
        </p>
      </div>

      <div className="ride-card-container">
        <p className="ride-detail">
          <FaLocationDot style={{ paddingRight: "5px", color: "#f04925" }} />
          {ride.source}
        </p>
        <p className="ride-detail">
          {ride.date} <FiCalendar />
        </p>
      </div>

      <div className="ride-card-container">
        <p className="ride-detail">
          <FaLocationDot style={{ paddingRight: "5px", color: "#f04925" }} />
          {ride.destination}
        </p>
        <p className="ride-detail">
          {ride.time} <MdAccessTime />
        </p>
      </div>

      <div className="ride-card-container">
        <p className="ride-detail">
          <FaCar style={{ paddingRight: "5px" }} />
          {ride.car.model}, {ride.car.make}
        </p>
        <p className="ride-detail">{ride.distance_in_miles} miles</p>
      </div>
    </div>
  );
};

const PassengerHistory = () => {
  const [rides, setRides] = useState({ driver: [], passenger: [] });

  useEffect(() => {
    // Simulating fetching data from API
    setRides(ridesHistoryData);
  }, []);

  /* useEffect(() => {
    const fetchRidesData = async () => {
      try {
        // Make an API call here to get the ride history data
        const response = await fetch("http://127.0.0.1:8000/api/ride");
        const data = await response.json();
        if (response.ok) {
          setRides(data);
        } else {
          console.error(
            "Failed to fetch ride history. Server returned:",
            response.status,
            response.statusText
          );
        }
        // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching ride data:", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchRidesData();
  }, []); */

  return (
    <div className="ride-page">
      <h2 className="rides-page-title">
        Passenger Ride History <GrHistory style={{ paddingLeft: "5px" }} />
      </h2>
      <div className="ride-container">
        {rides.driver.map((ride) => (
          <Card key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default PassengerHistory;
