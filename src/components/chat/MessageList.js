import React from "react";
import MessageComponent from "./MessageComponent";

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageComponent
          key={index}
          message={message}
          isOwnMessage={message.senderId === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
