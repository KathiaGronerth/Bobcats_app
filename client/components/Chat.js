import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  // You'd also probably have a useState for the chat messages to display them

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send message logic goes here
    setMessage(""); // Clear the message input
  };

  return (
    <div>
      <h2>Chat</h2>
      {/* Display chat messages here */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
