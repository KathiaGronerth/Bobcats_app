import React, { userState, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CarProfile from "./CarProfile";
import Reviews from "./Review"; // Assuming you have a Reviews component

const userData = {
  /*From driver model*/
  userId: 1,
  name: "Lucy Doe",
  photoUrl: "/images/photo1.jpg",
  coverPhotoUrl: "/images/cover_photo.jpg",
  rating: 4.5 /*can get it from the average rating*/,
  bio: "Passionate traveler and friendly driver. Whether you're traveling for work or leisure, I look forward to being part of your next travel story!",
  trips: 120 /*can get this info from number of rides*/,
  years: 3 /*can get this info from createdAt*/,
  from: "New York",
  speaks: ["English", "Spanish"],
  studies: "Master of Computer Science",
  /*From car model*/
  hasCar: true,
  carDetails: {
    make: "Tesla",
    model: "Model X",
    year: "2020",
    licensePlate: "XYZ1234",
    color: "White",
  },
  // rides: [
  //   {
  //     source: "New York",
  //     destination: "Washington DC",
  //     date: "2023-10-08",
  //     time: "14:00",
  //   },
  //   {
  //     source: "Los Angeles",
  //     destination: "San Francisco",
  //     date: "2023-10-10",
  //     time: "09:00",
  //   },
  // ],
  reviews: [
    {
      id: 1,
      title: "Great experience!",
      content:
        "Lucy was a fantastic driver, very punctual and polite. Highly recommend!",
      rating: 5,
      user: {
        name: "Natalie Smith",
        photoUrl: "/images/photo2.jpg",
      },
    },
    {
      id: 2,
      title: "Comfortable ride",
      content: "The car was clean and comfortable, and Lucy was very friendly.",
      rating: 4,
      user: {
        name: "Luis Lopez",
        photoUrl: "/images/photo3.jpg",
      },
    },
  ],
};

// const UserProfile = ({ userId }) => {
const UserProfile = ({ user = userData }) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [userReviews, setUserReviews] = useState(user.reviews);

  // const addNewReview = (newReview) => {
  //   setUserReviews([
  //     ...userReviews,
  //     { ...newReview, id: userReviews.length + 1 },
  //   ]);
  // };

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

  const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/api/users/${userId}`); // Update with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  const addNewReview = async (newReview) => {
    setUserReviews([...userReviews, newReview]);
    try {
      // const response = await fetch(`/api/users/${userId}/reviews`, {
      const response = await fetch(
        "https://run.mocky.io/v3/57c67805-cf39-4902-b83c-cad6617dd210",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reviewData = await response.json();
      setUserData({
        ...userData,
        reviews: [...userData.reviews, reviewData],
      });
    } catch (e) {
      setError(e.message);
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!userData) return <div>No user data found</div>;

  return (
    <div className="user-profile">
      <div className="cover-photo">
        <img src={user.coverPhotoUrl} alt="Cover" className="cover-photo-img" />
        <div className="profile-header">
          <img
            src={user.photoUrl}
            alt={`${user.name}'s profile`}
            className="profile-pic"
          />
        </div>
      </div>
      <div className="profile-content">
        <h1>{user.name}</h1>
        {user.hasCar && <div className="driver-title">Driver</div>}
        <div className="studies">
          <span>{user.studies}</span>
        </div>
        <div className="speaks">
          {user.speaks.length > 0
            ? user.speaks.map((language, index) => (
                <span key={index}>
                  {language}
                  {index < user.speaks.length - 1 ? ", " : ""}
                </span>
              ))
            : user.speaks}
        </div>
      </div>
      <div className="stats-container">
        <div className="stats trips">
          <span className="number">{user.trips.toLocaleString()}</span>
          <span className="label">Trips</span>
        </div>
        <div className="stats years">
          <span className="number">{user.years}</span>
          <span className="label">Years</span>
        </div>
        <div className="stats years">
          <span className="number">{renderStars(user.rating)}</span>
          <span className="label">Rating</span>
        </div>
      </div>
      <div className="bio-section">
        <h3 className="bio-label">Bio</h3>
        <p>{user.bio}</p>
      </div>

      <div className="additional-info">
        <div className="user-description">
          <h3>From:</h3>
          <p>{user.from}</p>
          <h3>Speaks:</h3>
          <p>{user.speaks.join(", ")}</p>
          <h3>Studies:</h3>
          <p>{user.studies}</p>
          {user.hasCar && <CarProfile carData={user.carDetails} />}
        </div>
        <div className="user-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              //left: "prev,next today",
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
          />
        </div>
      </div>
      <div className="review">
        <h3 style={{ marginLeft: "50px" }}>Reviews</h3>
        {userReviews && (
          <Reviews reviews={userReviews} onAddReview={addNewReview} />
          // <ReviewsList reviews={userReviews} onAddReview={addNewReview} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
