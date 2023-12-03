import React, { useState, useEffect } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import config from "./config";
import useScript from "./useScript";

const PostRideForm = () => {
  const [formData, setFormData] = useState({
    source: "",
    sourceLatLng: null,
    destination: "",
    destinationLatLng: null,
    date: "",
    time: "",
    seats: "",
    price: "",
  });
  const navigate = useNavigate();
  const apiKey = config.googleMapsApiKey;
  const access = JSON.parse(sessionStorage.getItem("access"));

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

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = async (address, name) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: address,
        [`${name}LatLng`]: latLng,
      }));
    } catch (error) {
      console.error("Error selecting place", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure data from formData
    const {
      source,
      sourceLatLng,
      destination,
      destinationLatLng,
      date,
      time,
      seats,
      price,
    } = formData;

    // Check if the required fields are filled
    if (
      !source ||
      !sourceLatLng ||
      !destination ||
      !destinationLatLng ||
      !date ||
      !time ||
      !seats ||
      !price
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    // Create the request body
    const requestBody = {
      source,
      source_coordinates: {
        lat: sourceLatLng.lat,
        lng: sourceLatLng.lng,
      },
      destination,
      destination_coordinates: {
        lat: destinationLatLng.lat,
        lng: destinationLatLng.lng,
      },
      time,
      date,
      seats_available: parseInt(seats, 10),
      price_per_seat: parseFloat(price),
    };

    try {
      // Make the API call
      const response = await fetch("http://127.0.0.1:8000/api/ride", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
          // Add any other headers you need, e.g., authorization token
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Ride posted successfully");
        navigate("/");
      } else {
        console.error(
          "Failed to post ride. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error posting ride:", error);
    }
    // event.preventDefault();
    //console.log(formData);
    // navigate("/success");
    console.log("requestBody : ", requestBody);
    navigate("/driverhistory");
  };

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-ride-main-container">
      <div className="post-ride-form-wrapper">
        <h2>
          Post Your Ride <IoCarSportSharp style={{ color: "#98ed64" }} />
        </h2>
        <form onSubmit={handleSubmit} className="post-ride-form">
          <PlacesAutocomplete
            value={formData.source}
            onChange={(value) => handleInputChange("source", value)}
            onSelect={(value) => handleSelect(value, "source")}
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
                    placeholder: "Source",
                    className: "post-ride-form-input",
                    required: true,
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => (
                    <div
                      {...getSuggestionItemProps(suggestion)}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <PlacesAutocomplete
            value={formData.destination}
            onChange={(value) => handleInputChange("destination", value)}
            onSelect={(value) => handleSelect(value, "destination")}
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
                    placeholder: "Destination",
                    className: "post-ride-form-input",
                    required: true,
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => (
                    <div
                      {...getSuggestionItemProps(suggestion)}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <input
            className="post-ride-form-input"
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
          />
          <input
            className="post-ride-form-input"
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            required
          />
          <input
            className="post-ride-form-input"
            type="number"
            name="seats"
            value={formData.seats}
            onChange={(e) => handleInputChange("seats", e.target.value)}
            placeholder="Available Seats"
            min="1"
            required
          />
          <input
            className="post-ride-form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="Price per seat"
            min="1"
            required
          />

          <button type="submit" className="post-ride-submit-btn">
            Post Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRideForm;
