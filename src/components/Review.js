import React, { useState } from "react";

// Assuming this Review component is for a single review
const Review = ({ review }) => {
  // Helper function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (i < rating ? "★" : "☆")).join("");
  };

  return (
    <div className="review-card">
      <img
        src={review.user.photoUrl}
        alt={`${review.user.name}`}
        className="review-user-photo"
      />
      <div className="review-text">
        <div className="review-user-name">{review.user.name}</div>
        <div className="review-rating">{renderStars(review.rating)}</div>
        <div className="review-content">{review.content}</div>
      </div>
    </div>
  );
};

// Assuming this ReviewsList component is used to render the list of reviews
// const ReviewsList = ({ reviews, onAddReview }) => {
const ReviewsList = ({ reviews }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 0,
    user: {
      name: "Anonymous", // Default name for the new review
      photoUrl: "/images/default_photo.jpg", // Default photo for the new review
    },
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      !newReview.title.trim() ||
      !newReview.content.trim() ||
      newReview.rating <= 0
    ) {
      setError("All fields are required and a rating must be selected.");
      return;
    }
    // Add the new review to the list
    reviews.push({
      ...newReview,
      id: reviews.length + 1, // Assuming each review has a unique id
    });
    // Reset form state
    setNewReview({
      title: "",
      content: "",
      rating: 0,
      user: { name: "Anonymous", photoUrl: "/images/default_photo.jpg" },
    });
    setError("");
  };

  // const [newReview, setNewReview] = useState({
  //   title: "",
  //   content: "",
  //   rating: 0,
  // });
  // const [error, setError] = useState("");

  // const handleSubmit = async () => {
  //   if (!newReview.title.trim() || !newReview.content.trim() || newReview.rating <= 0) {
  //     setError("All fields are required and a rating must be selected.");
  //     return;
  //   }

  //   // Here you would send the new review to the backend
  //   try {
  //     const response = await fetch('/api/reviews/', { // Replace with your actual API endpoint
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Include other headers as needed, like authorization tokens
  //       },
  //       body: JSON.stringify(newReview),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const addedReview = await response.json();
  //     onAddReview(addedReview); // Call the passed in function to update the parent component's state

  //     // Reset the form state
  //     setNewReview({
  //       title: "",
  //       content: "",
  //       rating: 0,
  //     });
  //     setError("");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
      <div className="review-form">
        <div className="reviewInput">
          <input
            type="text"
            value={newReview.title}
            onChange={(e) =>
              setNewReview({ ...newReview, title: e.target.value })
            }
            placeholder="Review Title"
          />
        </div>
        {/* <div className="reviewText"> */}
        <textarea
          value={newReview.content}
          onChange={(e) =>
            setNewReview({ ...newReview, content: e.target.value })
          }
          placeholder="Your experience"
        />
        {/* </div> */}
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
      </div>
    </div>
  );
};

export default ReviewsList;
