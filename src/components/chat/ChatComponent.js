// export const users = [
//   {
//     id: "user1",
//     name: "John Doe",
//     type: "passenger",
//   },
//   {
//     id: "user2",
//     name: "Jane Smith",
//     type: "driver",
//   },
// ];

// export const initialMessages = [
//   {
//     messageId: "msg1",
//     senderId: "user1",
//     receiverId: "user2",
//     text: "Hi, I'm outside the building.",
//     timestamp: "2023-11-22T09:00:00Z",
//   },
//   {
//     messageId: "msg2",
//     senderId: "user2",
//     receiverId: "user1",
//     text: "Great, I'll be there in a minute.",
//     timestamp: "2023-11-22T09:01:00Z",
//   },
// ];

import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatComponent = ({ user_id, ride_id }) => {
  const [messages, setMessages] = useState([]); // Initialize with an empty array

  const [webSocket, setWebSocket] = useState(null);

  // Function to fetch initial messages from the API
  const fetchInitialMessages = async () => {
    try {
      // Corrected the API endpoint to match the provided format
      const response = await axios.get(
        // `http://127.0.0.1:8000/api/ride/${ride_id}/message`
        "https://run.mocky.io/v3/d25647b8-57ca-4f89-bbc2-23a3fbae5211"
      );
      // Assuming the response has a 'messages' array, update the state
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  useEffect(() => {
    fetchInitialMessages(); // Fetch initial messages when the component mounts

    // Create a new WebSocket connection
    const newWebSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${ride_id}`
    );
    newWebSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newWebSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // Assuming 'data' contains a 'message' object
      if (data && data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    newWebSocket.onclose = () => {
      console.error("Chat socket closed unexpectedly");
    };

    setWebSocket(newWebSocket);

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      newWebSocket.close();
    };
  }, [ride_id]); // Added 'ride_id' as a dependency for useEffect

  const sendMessage = async (messageText) => {
    const messageData = {
      messageId: `msg${messages.length + 1}`,
      senderId: user_id,
      receiverId: user_id === "user1" ? "user2" : "user1", // Assuming a two-user chat for simplicity
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      // Send the message through WebSocket
      webSocket.send(JSON.stringify({ message: messageData }));
    } else {
      // Fallback to sending the message via the API
      try {
        //await axios.post(`http://127.0.0.1:8000/api/ride/${ride_id}/message`, {
        await axios.post(
          "https://run.mocky.io/v3/d25647b8-57ca-4f89-bbc2-23a3fbae5211",
          {
            message: messageText,
          }
        );
      } catch (error) {
        console.error("Error sending message via API:", error);
      }
    }

    // Add the new message to the messages state
    setMessages([...messages, messageData]);
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <MessageList messages={messages} currentuser_id={user_id} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;
