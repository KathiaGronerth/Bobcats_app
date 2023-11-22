import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(message);
    setMessage("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit"></button>
    </form>
  );
};

export default ChatInput;
