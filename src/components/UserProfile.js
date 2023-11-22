import React from "react";
import CarProfile from "./CarProfile";

// Dummy user data
const dummyUser = {
  name: "John Doe",
  photoUrl: "/images/profile_photo.jpg",
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
  bio: "Passionate traveler and friendly driver",
  isDriver: true,
  carDetails: {
    make: "Tesla",
    model: "Model X",
    year: "2020",
  },
};

const UserProfile = ({ user = dummyUser }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={user.photoUrl}
            alt={`${user.name}'s profile`}
            className="profile-pic"
          />
          <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            {user.isDriver && (
              <p>
                Typical Commute:{" "}
                {user.rides
                  .map((ride) => `${ride.source} to ${ride.destination}`)
                  .join(", ")}
              </p>
            )}
          </div>
        </div>
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
