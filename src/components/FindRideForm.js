import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useScript from "./useScript.js";
import config from "./config.js";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const FindRideForm = () => {
  // Using dummy data for the fields as initial values
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState("");
  const [dateTime, setDateTime] = useState("2023-11-01T12:00");
  const [specialNeeds, setSpecialNeeds] = useState("");

  const navigate = useNavigate();
  const apiKey = config.googleMapsApiKey;

  // Use the custom useScript hook
  const [scriptLoaded, scriptError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  );

  useEffect(() => {
    // Check if the script has been loaded successfully
    if (scriptLoaded) {
      console.log("Google Maps API script has been loaded");
    }
    // Handle any errors if the script fails to load
    if (scriptError) {
      console.error("Error loading Google Maps API script", scriptError);
    }
  }, [scriptLoaded, scriptError]);

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform geocoding to get coordinates
      const sourceResults = await geocodeByAddress(source);
      const sourceLatLng = await getLatLng(sourceResults[0]);

      const destinationResults = await geocodeByAddress(destination);
      const destinationLatLng = await getLatLng(destinationResults[0]);

      // Create the request body
      const requestBody = {
        source,
        source_coordinates: sourceLatLng,
        destination,
        destination_coordinates: destinationLatLng,
        datetime: dateTime,
        travelers: parseInt(travelers, 10),
        specialneeds: specialNeeds,
      };

      // Make the API call
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need, e.g., authorization token
        },
        body: JSON.stringify(requestBody),
      });
      console.log("requestBody : ", requestBody);

      /*if (response.ok) {
        console.log("Ride search request sent successfully");
        // Navigate to the appropriate page after the successful API call
        navigate("/rides");
      } else {
        console.error(
          "Failed to send ride search request. Server returned:",
          response.status,
          response.statusText
        );
      } */
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

      // Focus on the input field after selection
      document.activeElement.blur();
    } catch (error) {
      console.error("Error selecting place", error);
    }
  };

  return (
    <div
      className="main-find-ride-form"
      style={{ paddingTop: "100px", backgroundColor: "#e7f7fe" }}
    >
      <div className="find-ride-form">
        <form onSubmit={handleSubmit}>
          <h2>
            Find a Ride
            <IoSearch style={{ color: "#98ed64", margin: "5px" }} />
          </h2>
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="Number of Travelers"
              required
            />
          </div>
          <div className="input-group">
            <textarea
              rows="4"
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              placeholder="Specify any special needs or requirements..."
            />
          </div>
          <button type="submit" className="find-ride-button">
            Search Rides
          </button>
        </form>
      </div>
    </div>
  );
};

export default FindRideForm;
