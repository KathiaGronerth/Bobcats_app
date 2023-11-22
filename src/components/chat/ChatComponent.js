import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export const users = [
  {
    id: "user1",
    name: "John Doe",
    type: "passenger",
  },
  {
    id: "user2",
    name: "Jane Smith",
    type: "driver",
  },
];

export const initialMessages = [
  {
    messageId: "msg1",
    senderId: "user1",
    receiverId: "user2",
    text: "Hi, I'm outside the building.",
    timestamp: "2023-11-22T09:00:00Z",
  },
  {
    messageId: "msg2",
    senderId: "user2",
    receiverId: "user1",
    text: "Great, I'll be there in a minute.",
    timestamp: "2023-11-22T09:01:00Z",
  },
];

const ChatComponent = ({ userId }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newWebSocket = new WebSocket(
      "ws://localhost:8000/ws/chat/some-room-name/"
    );

    newWebSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newWebSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    newWebSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly");
    };

    setWebSocket(newWebSocket);

    return () => {
      newWebSocket.close();
    };
  }, []);

  const sendMessage = (messageText) => {
    const messageData = {
      text: messageText,
      sender: userId,
      timestamp: new Date().toISOString(),
    };
    webSocket.send(JSON.stringify({ message: messageData }));
    setMessages([...messages, messageData]);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} currentUserId={userId} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatComponent;
