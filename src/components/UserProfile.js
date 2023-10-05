import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>{user.name}</h1>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      <div className="rides">
        <h2>My Rides</h2>
        {user.rides.map((ride, index) => (
          <div key={index} className="ride">
            <p>
              From: {ride.source} To: {ride.destination}
            </p>
            <p>
              Date: {ride.date} Time: {ride.time}
            </p>
          </div>
        ))}
      </div>

      <div className="reviews">
        <h2>My Reviews</h2>
        {user.reviews.map((review, index) => (
          <div key={index} className="review">
            <p>
              <strong>{review.reviewer}</strong>: {review.comment}
            </p>
          </div>
        ))}
      </div>

      <button className="settings-btn">Settings</button>
    </div>
  );
};

export default UserProfile;
