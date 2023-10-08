import React from "react";

// Dummy user data
const dummyUser = {
  name: "John Doe",
  rides: [
    {
      source: "New York",
      destination: "Washington DC",
      date: "2023-10-08",
      time: "14:00",
    },
    {
      source: "Los Angeles",
      destination: "San Francisco",
      date: "2023-10-10",
      time: "09:00",
    },
  ],
  reviews: [
    {
      reviewer: "Alice",
      comment: "Great ride! John is a safe driver.",
    },
    {
      reviewer: "Bob",
      comment: "Had a pleasant trip with John. Would recommend!",
    },
  ],
};

const UserProfile = ({ user = dummyUser }) => {
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
