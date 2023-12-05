import React, { useState } from "react";

const default_profile_photo = "/images/default_profile_photo.jpg";

const ReviewDriver = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (i < rating ? "★" : "☆")).join("");
  };

  return (
    <div className="review-card">
      <img
        // src={review.ride.driver.profile_photo || default_profile_photo}
        src={`data:image/jpeg;base64, ${review.passenger.profile_photo}` || default_profile_photo}
        alt={`${review.ride.driver.name}`}
        className="review-user-photo"
      />
      <div className="review-text">
        <div className="review-user-name">{review.passenger.name}</div>
        <div className="review-rating">{renderStars(review.rating)}</div>
        <div className="review-content">{review.review}</div>
      </div>
    </div>
  );
};

const ReviewsListDriver = ({ reviews }) => {
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
    ride: {
      driver: {
        name: "Anonymous",
        profile_photo: "/images/default_profile_photo.jpg",
      },
    },
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!newReview.review.trim() || newReview.rating <= 0) {
      setError("All fields are required and a rating must be selected.");
      return;
    }

    console.log("Submitting review:", newReview); // Debugging log

    try {
      //You can uncomment these lines
      const access = JSON.parse(sessionStorage.getItem("access"));
      const response = await fetch("http://127.0.0.1:8000/api/review", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      /* you can commented out these lines to... */
      // const response = await fetch(
      //   "https://run.mocky.io/v3/f3b4b6f0-fea8-4ce7-b57f-e600d625a6fd",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newReview),
      //   }
      // );
      /*...here*/

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const newResponseData = response.json();

        console.log(newResponseData);
      }

      console.log("Response received"); // Debugging log

      setNewReview({
        review: "",
        rating: 0,
        ride: {
          driver: {
            name: "Anonymous",
            profile_photo: default_profile_photo,
          },
        },
      });
      setError("");
    } catch (error) {
      setError(error.message);
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <ReviewDriver key={index} review={review} />
      ))}
      {/* <div className="review-form">
        <textarea
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          placeholder="Your experience"
        />
        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
        >
          <option value="0">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button onClick={handleSubmit}>Submit Review</button>
        {error && <p className="error-message">{error}</p>}
      </div> */}
    </div>
  );
};

export default ReviewsListDriver;
