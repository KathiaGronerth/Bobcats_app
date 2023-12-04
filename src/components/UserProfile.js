import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CarProfile from "./CarProfile";
import ReviewsListUser from "./ReviewsList_User";
import EditUserProfile from "./EditUserProfile";
import { DEMO_EVENTS, DEMO_COURSE_EVENTS } from "./calendar/Calendar"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; 

const default_profile_photo = "/images/default_profile_photo.jpg";
const default_cover_photo = "/images/default_cover_photo.jpg";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const navigateToHome = () => {
    navigate("/"); 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //You can uncomment these lines
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

        /* you can commented out these lines to... */
        // const response = await fetch(
        //   "https://run.mocky.io/v3/d80c60c3-7f40-44f4-bace-31eaeada02ad"
        // );
        /*...here*/

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserData();
  }, []);

  console.log("UserData: ", userData);
  console.log("Error: ", error);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2;
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

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedProfile) => {
    console.log("Saving updated profile:", updatedProfile);

    try {
      const access = JSON.parse(sessionStorage.getItem("access"));
      const response = await fetch("http://127.0.0.1:8000/api/profile",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      // const response = await fetch(
      //   "https://run.mocky.io/v3/f3b4b6f0-fea8-4ce7-b57f-e600d625a6fd",
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedProfile),
      //   }
      // );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setUserData({ ...userData, profile: updatedData });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <div className="user-profile-container" style={{backgroundColor:"#f9f9f9"}}>
      <div className="cover-photo">
        {/* <img
          src={userData.cover_photo || default_cover_photo}
          alt="Cover"
          className="cover-photo-img"
        /> */}
        <img
          src={`data:image/jpeg;base64, ${userData.cover_photo}` || default_cover_photo}
          alt="Profile"
          className="cover-photo-img"
        />
        <div className="profile-header">
          {/* <img
            src={userData.profile_photo || default_profile_photo}
            alt={`${userData.name}'s profile`}
            className="profile-pic"
          /> */}
          <img
            src={`data:image/jpeg;base64, ${userData.profile_photo}` || default_profile_photo}
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </div>
      {isEditing ? (
        <EditUserProfile profile={userData} onSave={handleSave} />
      ) : (
        <>
            <button
            className="edit-submit-btn"
            style={{ marginLeft: "450px" }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
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
          <div style={{ padding: "0px" }} className="stats-container">
            <div className="stats trips">
              <span className="number">{userData.trips.toLocaleString()}</span>
              <span className="label">Trips</span>
            </div>
            <div className="stats years">
              <span className="number">
                {calculateYearsSince(userData.created_at)}
              </span>
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
                events={[...DEMO_EVENTS, ...DEMO_COURSE_EVENTS]}
              />
            </div>
          </div>
          <div className="review">
            <h3 style={{ marginLeft: "50px" }}>Reviews</h3>
            {userData.reviews && <ReviewsListUser reviews={userData.reviews} />}
          </div>
        </>
      )}
      <button
        className="edit-submit-btn"
        style={{ marginLeft: "20px" }} // Adjust styling as needed
        onClick={navigateToHome}
      >
        Go to Home
      </button>
    </div>
  );
};

export default UserProfile;
