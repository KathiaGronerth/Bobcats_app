// LocationSearchInput.jsx
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const DestinationSearchInput = () => {
  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelectPlace = async (selected) => {
    const results = await geocodeByAddress(selected);
    const latLng = await getLatLng(results[0]);
    console.log("Selected address:", selected);
    console.log("Selected coordinates:", latLng);

    // Set the selected address to the input field
    setAddress(selected);

    // Focus on the input field after selection
    document.activeElement.blur();
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter key press
    }
  };

  return (
    <div className="location-search-input-container">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelectPlace}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Going to...",
                className: "location-search-input",
                onKeyDown: handleEnterKey, // Prevent form submission on Enter key press
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default DestinationSearchInput;
