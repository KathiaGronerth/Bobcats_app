import React from "react";

const MessageComponent = ({ message, isOwnMessage }) => {
  const messageClass = isOwnMessage ? "my-message" : "other-message";

  return (
    <div className={`message ${messageClass}`}>
      {!isOwnMessage && (
        <div className="message-sender-name">{message.senderName}</div>
      )}
      <div className="message-content">{message.text}</div>
    </div>
  );
};

export default MessageComponent;
