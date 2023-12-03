import React from "react";

const default_profile_photo = "/images/default_profile_photo.jpg";

const ReviewUser = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (i < rating ? "★" : "☆")).join("");
  };

  return (
    <div className="review-card">
      <img
        // src={review.ride.driver.profile_photo || default_profile_photo}
        src={
          `data:image/jpeg;base64, ${review.ride.driver.profile_photo}` ||
          default_profile_photo
        }
        alt={`${review.ride.driver.name}`}
        className="review-user-photo"
      />
      <div className="review-text">
        <div className="review-user-name">{review.ride.driver.name}</div>
        <div className="review-rating">{renderStars(review.rating)}</div>
        <div className="review-content">{review.review}</div>
      </div>
    </div>
  );
};

const ReviewsListUser = ({ reviews }) => {
  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <ReviewUser key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewsListUser;
