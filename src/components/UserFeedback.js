import React, { useState } from "react";

const UserFeedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send feedback logic goes here
  };

  return (
    <div
      className="feeback-container"
      style={{
        paddingTop: "100px",
        backgroundColor: "#e7f7fe",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "#054957", fontSize: "22px" }}>Leave Feedback</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          style={{ backgroundColor: "#00aff5", borderRadius: "25px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserFeedback;
