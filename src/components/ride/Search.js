// Search.jsx
import React, { useEffect, useState } from "react";
import LocationSearchInput from "./LocationSearchInput";
import DestinationSearchInput from "./DestinationSearchInput";
import "./Search.css"; // Import your stylesheet
import { useNavigate } from "react-router-dom";

import config from "../../config.js";

const Search = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [dateTime, setDateTime] = useState("2023-11-01T12:00");
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [passengerCount, setPassengerCount] = useState(1); // Initialize with default value
  const navigate = useNavigate();
  const apiKey = config.googleMapsApiKey;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      setScriptLoaded(true);
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  const handleSearchClick = () => {
    // Add logic for handling the search (e.g., fetching available rides)
    // Once the search is done, navigate to the RidesPage
    navigate("/rides");
  };

  return (
    <div className="search-container">
      <div className="card">
        <div className="card-content">
          <LocationSearchInput />
          <div>
            <DestinationSearchInput />
          </div>
          <div className="input-field">
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="Today"
            />
          </div>
          <div className="input-field">
            <input
              type="number"
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              min="1"
              placeholder="1 Traveler"
            />
          </div>
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
