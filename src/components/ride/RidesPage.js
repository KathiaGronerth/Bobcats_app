import React, { useState, useEffect } from "react";
import "./RidePage.css";
import config from "../config.js";
import Search from "./Search.js";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { useLocation } from "react-router-dom";

const apiKey = config.googleMapsApiKey;
const carLogoUrl = "../../../assets/images/car-logo2.gif"; // Replace with the actual path or URL

const ridesData = [
  {
    id: 1,
    name: "John Doe",
    source: "Texas State University",
    source_coordinates: { lat: 29.888569106752026, lng: -97.93831881842321 },
    destination: "San Antonio, TX",
    destination_coordinates: {
      lat: 29.867572782874696,
      lng: -97.9428021719357,
    },
    time: "15 min",
    date: "2023-12-02",
    distance: "8.1 Miles",
    seats_available: 3,
    price_per_seat: "10$",
  },
  {
    id: 2,
    name: "Jane Smith",
    source: "Austin, TX",
    source_coordinates: { lat: 30.25, lng: -97.75 },
    destination: "Houston, TX",
    destination_coordinates: { lat: 29.7604, lng: -95.3698 },
    time: "15 min",
    date: "2023-12-02",
    distance: "8.1 Miles",
    seats_available: 2,
    price_per_seat: "5$",
  },
  {
    id: 3,
    name: "Bob Johnson",
    source: "Dallas, TX",
    source_coordinates: { lat: 32.7767, lng: -96.797 },
    destination: "New Orleans, LA",
    destination_coordinates: { lat: 29.9511, lng: -90.0715 },
    time: "15 min",
    date: "2023-12-02",
    distance: "8.1 Miles",
    seats_available: 1,
    price_per_seat: "8$",
  },
  // Add more ride objects as needed
];

const RideCard = ({ ride, onMapClick, isSelected }) => {
  return (
    <div
      className={`ride-card ${isSelected ? "selected" : ""}`}
      onClick={() => onMapClick(ride)}
    >
      <div className="name">{ride.name}</div>
      <div className="source">From {ride.source}</div>
      <div className="time-distance">
        {ride.time}{" "}
        <MdAccessTime
          style={{
            width: "20px",
            height: "auto",
          }}
        />
        / {ride.distance}
      </div>
      <div className="seat">
        Seats available
        <MdOutlineAirlineSeatReclineNormal />: {ride.seats_available}
      </div>
      <div className="seat">Price : {ride.price_per_seat}</div>
      <div className="calculate-time">Driver is 10 mins away from you!</div>
    </div>
  );
};

const RidesPage = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const location = useLocation();
  const { searchCriteria } = location.state || {};

  useEffect(() => {
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.addEventListener("load", () => setGoogleMapsLoaded(true));
    document.head.appendChild(googleMapsScript);

    return () => {
      document.head.removeChild(googleMapsScript);
    };
  }, [searchCriteria.source]);

  useEffect(() => {
    if (googleMapsLoaded) {
      initializeMap();
    }
  }, [googleMapsLoaded, searchCriteria, selectedRide]);

  const initializeMap = () => {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    const mapOptions = {};

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    const markers = [];

    if (
      searchCriteria?.source_coordinates &&
      searchCriteria?.destination_coordinates
    ) {
      const sourceMarker = new window.google.maps.Marker({
        position: searchCriteria.source_coordinates,
        map: map,
        title: "Source Location",
        label: "A",
      });

      markers.push(sourceMarker);

      const destinationMarker = new window.google.maps.Marker({
        position: searchCriteria.destination_coordinates,
        map: map,
        title: "Destination Location",
        label: "B",
      });

      markers.push(destinationMarker);

      const directionsService = new window.google.maps.DirectionsService();
      const renderer = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
      });

      const request = {
        origin: searchCriteria.source_coordinates,
        destination: searchCriteria.destination_coordinates,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, function (result, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
          renderer.setDirections(result);

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>Estimated time: ${result.routes[0].legs[0].duration.text}</div>`,
          });

          infoWindow.open(map, sourceMarker);
        } else {
          console.error("Error fetching directions:", status);
        }
      });
    }

    // Show marker for the selected ride
    if (selectedRide?.source_coordinates) {
      const selectedRideMarker = new window.google.maps.Marker({
        position: selectedRide.source_coordinates,
        map: map,
        title: "Selected Ride Source Location",
        icon: {
          url: carLogoUrl,
          scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
        },
      });

      markers.push(selectedRideMarker);
    }

    // Create a LatLngBounds object to include all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Extend the bounds with each marker's position
    markers.forEach((marker) => bounds.extend(marker.getPosition()));

    // Set the map bounds to include all markers
    map.fitBounds(bounds);

    // Adjust the zoom level to provide some padding
    const listener = window.google.maps.event.addListenerOnce(
      map,
      "idle",
      function () {
        if (map.getZoom() > 15) {
          map.setZoom(15);
        }
      }
    );

    // Remove the listener after it's been executed
    window.google.maps.event.removeListener(listener);
  };

  const handleMapClick = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className="main-container">
      <Search
        sourceValue={searchCriteria?.source}
        destinationValue={searchCriteria?.destination}
        dateTimeValue={searchCriteria?.dateTime}
        passengerCountValue={searchCriteria?.passengerCount}
      />
      <div className="rides-page">
        <div className="rides-column">
          <div className="rides-list">
            {ridesData.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onMapClick={handleMapClick}
                isSelected={selectedRide && selectedRide.id === ride.id}
              />
            ))}
          </div>
        </div>
        <div className="map-column">
          <div className="map-container" id="map"></div>
        </div>
      </div>
    </div>
  );
};

export default RidesPage;
