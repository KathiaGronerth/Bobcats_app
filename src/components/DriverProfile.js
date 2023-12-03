import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CarProfile from "./CarProfile";
import ReviewsListDriver from "./ReviewsList_Driver"; // Assuming you have a Reviews component

const default_profile_photo = "/images/default_profile_photo.jpg";
const default_cover_photo = "/images/default_cover_photo.jpg";

const DriverProfile = () => {
  const [rideData, setRideData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        //You can uncomment these lines
        //const access = JSON.parse(sessionStorage.getItem("access"));
        //const response = await fetch("http://127.0.0.1:8000/api/ride", {
        // {
        //   headers: {
        //     Authorization: `Bearer ${access}`,
        //     "Content-Type": "application/json",
        //   },
        // });

        /* you can commented out these lines to... */
        const response = await fetch(
          "https://run.mocky.io/v3/f3b4b6f0-fea8-4ce7-b57f-e600d625a6fd"
        );
        /*...here*/

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRideData(data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchRideData();
  }, []);

  console.log("RideData: ", rideData);
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

  const calculateYearsSince = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
    const givenDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
    if (
      currentDate.getMonth() < givenDate.getMonth() ||
      (currentDate.getMonth() === givenDate.getMonth() &&
        currentDate.getDate() < givenDate.getDate())
    ) {
      return yearsDiff - 1;
    }
    return yearsDiff;
  };

  if (error) return <div>Error: {error}</div>;
  if (!rideData) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <div className="cover-photo">
        <img
          src={rideData.profile.cover_photo || default_cover_photo}
          alt="Cover"
          className="cover-photo-img"
        />
        {/* <img
          src={`data:image/jpeg;base64, ${rideData.profile.cover_photo}` || default_cover_photo}
          alt="Profile"
          className="cover-photo-img"
        /> */}
        <div className="profile-header">
          <img
            src={rideData.profile.profile_photo || default_profile_photo}
            alt={`${rideData.profile.name}'s profile`}
            className="profile-pic"
          />
          {/* <img
          src={`data:image/jpeg;base64, ${rideData.profile.profile_photo}` || default_profile_photo}
          alt={`${rideData.profile.name}'s profile`}
          className="profile-pic"
        /> */}
        </div>
      </div>
      <div className="profile-content">
        <h1>{rideData.profile.name}</h1>
        {rideData.profile.has_car && <div className="driver-title">Driver</div>}
        <div className="studies">
          <span>{rideData.profile.studies}</span>
        </div>
        <div className="speaks">
          {rideData.profile.speaks.length > 0
            ? rideData.profile.speaks.map((language, index) => (
                <span key={index}>
                  {language}
                  {index < rideData.profile.speaks.length - 1 ? ", " : ""}
                </span>
              ))
            : rideData.profile.speaks}
        </div>
      </div>
      <div className="stats-container">
        <div className="stats trips">
          <span className="number">
            {rideData.profile.trips.toLocaleString()}
          </span>
          <span className="label">Trips</span>
        </div>
        <div className="stats years">
          <span className="number">
            {" "}
            {calculateYearsSince(rideData.profile.created_at)}
          </span>
          <span className="label">Years</span>
        </div>
        <div className="stats rating">
          <span className="number">{renderStars(rideData.profile.rating)}</span>
          <span className="label">Rating</span>
        </div>
      </div>
      <div className="bio-section">
        <h3 className="bio-label">Bio</h3>
        <p>{rideData.profile.bio}</p>
      </div>

      <div className="additional-info">
        <div className="user-description">
          <h3>From:</h3>
          <p>{rideData.profile.from_location}</p>
          {rideData.profile.has_car && (
            <CarProfile carData={rideData.profile.cars[0]} />
          )}
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
        {rideData.reviews && <ReviewsListDriver reviews={rideData.reviews} />}
      </div>
    </div>
  );
};

export default DriverProfile;
