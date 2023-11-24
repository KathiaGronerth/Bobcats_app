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

const Search = () => {
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [passengerCount, setPassengerCount] = useState(1);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
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

  const handleSearchClick = () => {
    // Add logic for handling the search (e.g., fetching available rides)
    // Once the search is done, navigate to the RidesPage
    navigate("/rides");
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