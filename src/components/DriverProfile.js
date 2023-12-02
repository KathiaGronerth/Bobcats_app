import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CarProfile from "./CarProfile";
import Reviews from "./Review"; // Assuming you have a Reviews component

const DriverProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        // const response = await fetch("http://127.0.0.1:8000/api/notrideyet/driver/user");
        const response = await fetch(
          "https://run.mocky.io/v3/1979ee24-f7b4-4a38-a062-43841f8823c0"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    // Fetch reviews
    const fetchReviews = async () => {
      try {
        //const response = await fetch("http://127.0.0.1:8000/api/review");
        const response = await fetch(
          "https://run.mocky.io/v3/8aa6b7e3-2bdb-4d5d-93d3-bdbdf4b90d7e"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reviews = await response.json();
        setUserReviews(reviews);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserData();
    fetchReviews();
  }, []);

  console.log("UserData: ", userData);
  console.log("UserReviews: ", userReviews);
  console.log("Error: ", error);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // round to nearest half
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(roundedRating)) {
        stars += "⭐";
      } else if (i < roundedRating) {
        stars += "★"; // half star
      } else {
        stars += "☆";
      }
    }
    return stars;
  };

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <div className="cover-photo">
        <img
          src={userData.coverphotourl}
          alt="Cover"
          className="cover-photo-img"
        />
        <div className="profile-header">
          <img
            src={userData.photourl}
            alt={`${userData.name}'s profile`}
            className="profile-pic"
          />
        </div>
      </div>
      <div className="profile-content">
        <h1>{userData.name}</h1>
        {userData.has_car && <div className="driver-title">Driver</div>}
        <div className="studies">
          <span>{userData.studies}</span>
        </div>
        <div className="speaks">
          {userData.speaks.length > 0
            ? userData.speaks.map((language, index) => (
                <span key={index}>
                  {language}
                  {index < userData.speaks.length - 1 ? ", " : ""}
                </span>
              ))
            : userData.speaks}
        </div>
      </div>
      <div className="stats-container">
        <div className="stats trips">
          <span className="number">{userData.trips.toLocaleString()}</span>
          <span className="label">Trips</span>
        </div>
        <div className="stats years">
          <span className="number">{userData.years}</span>
          <span className="label">Years</span>
        </div>
        <div className="stats rating">
          <span className="number">{renderStars(userData.rating)}</span>
          <span className="label">Rating</span>
        </div>
      </div>
      <div className="bio-section">
        <h3 className="bio-label">Bio</h3>
        <p>{userData.bio}</p>
      </div>

      <div className="additional-info">
        <div className="user-description">
          <h3>From:</h3>
          <p>{userData.from_location}</p>
          <h3>Speaks:</h3>
          <p>{userData.speaks.join(", ")}</p>
          <h3>Studies:</h3>
          <p>{userData.studies}</p>
          {userData.has_car && <CarProfile carData={userData.cars[0]} />}
        </div>
        <div className="user-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
          />
        </div>
      </div>
      <div className="review">
        <h3 style={{ marginLeft: "50px" }}>Reviews</h3>
        {userReviews && (
          <Reviews reviews={userReviews} onAddReview={setUserReviews} />
        )}
      </div>
    </div>
  );
};

export default DriverProfile;
