// Search.jsx
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import useScript from "../useScript.js";
import config from "../config.js";
import "./Search.css";

const Search = ({
  sourceValue,
  destinationValue,
  dateTimeValue,
  passengerCountValue,
}) => {
  const [dateTime, setDateTime] = useState(
    dateTimeValue || new Date().toISOString().slice(0, 16)
  );
  const [passengerCount, setPassengerCount] = useState(
    passengerCountValue || 1
  );
  const [source, setSource] = useState(sourceValue || "");
  const [destination, setDestination] = useState(destinationValue || "");
  const [sourceCoordinates, setSourceCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const navigate = useNavigate();
  const apiKey = config.googleMapsApiKey;

  // Use the custom useScript hook
  const [scriptLoaded, scriptError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  );

  useEffect(() => {
    console.log("Initial values from props:", {
      sourceValue,
      destinationValue,
      dateTimeValue,
      passengerCountValue,
    });

    // Check if the script has been loaded successfully
    if (scriptLoaded) {
      console.log("Google Maps API script has been loaded");
    }
    // Handle any errors if the script fails to load
    if (scriptError) {
      console.error("Error loading Google Maps API script", scriptError);
    }
  }, [
    scriptLoaded,
    scriptError,
    source,
    destination,
    dateTime,
    passengerCount,
  ]);

  const handleSearchClick = async (e) => {
    e.preventDefault();
    try {
      // Perform geocoding to get coordinates
      const sourceResults = await geocodeByAddress(source);
      const sourceLatLng = await getLatLng(sourceResults[0]);

      const destinationResults = await geocodeByAddress(destination);
      const destinationLatLng = await getLatLng(destinationResults[0]);

      // Create the request body
      const requestBody = {
        pickup_location: source,
        pickup_coordinates: sourceLatLng,
        drop_off_location: destination,
        drop_off_coordinates: destinationLatLng,
        datetime: dateTime,
        travelers: parseInt(passengerCount, 10),
        specialneeds: specialNeeds,
      };

      // Make the API call

      const response = await fetch("http://127.0.0.1:8000/api/find-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log("requestBody : ", requestBody);
      const searchCriteria = {
        source,
        destination,
        dateTime,
        passengerCount,
        source_coordinates: sourceCoordinates,
        destination_coordinates: destinationCoordinates,
      };

      if (response.ok) {
        console.log("Ride search request sent successfully");
        const rides = await response.json();
        // Navigate to the appropriate page after the successful API call
        navigate("/rides", { state: { searchCriteria, rides } });
      } else {
        console.error(
          "Failed to send ride search request. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error sending ride search request:", error);
    }
  };

  const handleSelectSource = async (selected) => {
    try {
      const results = await geocodeByAddress(selected);
      const latLng = await getLatLng(results[0]);
      console.log("Selected address:", selected);
      console.log("Selected coordinates:", latLng);

      // Set the selected address to the input field
      setSource(selected);
      setSourceCoordinates(latLng);

      // Focus on the input field after selection
      document.activeElement.blur();
    } catch (error) {
      console.error("Error selecting place", error);
    }
  };

  const handleSelectDestination = async (selected) => {
    try {
      const results = await geocodeByAddress(selected);
      const latLng = await getLatLng(results[0]);
      console.log("Selected address:", selected);
      console.log("Selected coordinates:", latLng);

      // Set the selected address to the input field
      setDestination(selected);
      setDestinationCoordinates(latLng);

      // Focus on the input field after selection
      document.activeElement.blur();
    } catch (error) {
      console.error("Error selecting place", error);
    }
  };

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-container">
      <div className="card">
        <div className="card-content">
          <div className="location-search-input-container">
            <PlacesAutocomplete
              value={source}
              onChange={setSource}
              onSelect={handleSelectSource}
            >
              {({
                getInputProps,
                getSuggestionItemProps,
                suggestions,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Leaving from...",
                      className: "location-search-input",
                      required: true,
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => (
                      <div
                        {...getSuggestionItemProps(suggestion)}
                        key={suggestion.placeId}
                        className="suggestion-item"
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className="location-search-input-container">
            <PlacesAutocomplete
              value={destination}
              onChange={setDestination}
              onSelect={handleSelectDestination}
            >
              {({
                getInputProps,
                getSuggestionItemProps,
                suggestions,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Going to...",
                      className: "location-search-input",
                      required: true,
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => (
                      <div
                        {...getSuggestionItemProps(suggestion)}
                        key={suggestion.placeId}
                        className="suggestion-item"
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
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
