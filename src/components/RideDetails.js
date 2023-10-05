import React from "react";

const RideDetails = ({ ride }) => {
  return (
    <div className="ride-details">
      <div className="driver-info">
        <h2>Driver: {ride.driverName}</h2>
        <p>Rating: {ride.rating}</p>
        <div className="reviews">
          {ride.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.reviewer}</strong>: {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="route-info">
        <h2>Route Details</h2>
        <p>From: {ride.source}</p>
        <p>To: {ride.destination}</p>
        <p>Date: {ride.date}</p>
        <p>Time: {ride.time}</p>
        <p>Seats Available: {ride.seatsAvailable}</p>
      </div>

      <button className="join-ride-btn">Join Ride</button>
    </div>
  );
};

export default RideDetails;
