import React from "react";

const CarProfile = ({ carData }) => {
  if (!carData) {
    return null; // or some placeholder if no car data is available
  }

  return (
    <div className="car-profile">
      <h3>Car Details</h3>
      <p>
        <strong>Make:</strong> {carData.make}
      </p>
      <p>
        <strong>Model:</strong> {carData.model}
      </p>
      <p>
        <strong>Year:</strong> {carData.year}
      </p>
    </div>
  );
};

export default CarProfile;
