import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

//const ChatComponent = ({selectedRide}) => {
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //   //You can uncomment these lines
        //   const access = JSON.parse(sessionStorage.getItem("access"));
        //   const response = await fetch("http://127.0.0.1:8000/api/profile", {
        //     headers: {
        //       Authorization: `Bearer ${access}`,
        //       "Content-Type": "application/json",
        //     },
        //   });

        /* you can commented out these lines to... */
        const response = await fetch(
          "https://run.mocky.io/v3/d80c60c3-7f40-44f4-bace-31eaeada02ad"
        );
        /*...here*/

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserData();
  }, []);

  //const fetchMessages = async (selectedRide) => {
  const fetchMessages = async () => {
    try {
      // const access = JSON.parse(sessionStorage.getItem("access"));
      // const response = await fetch(
      //   `http://127.0.0.1:8000/api/ride/${selectedRide.id}/message`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await axios.get(
        "https://run.mocky.io/v3/78dacaf3-1c32-4363-9808-89ce24338a55"
      );
      const formattedMessages = response.data.map((msg) => ({
        senderId: msg.sender.id,
        senderName: msg.sender.name,
        text: msg.message,
        timestamp: msg.timestamp,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    // fetchMessages(selectedRide);
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const sendMessage = async (messageText) => {
    if (userData) {
      const newMessage = {
        senderId: userData.id,
        senderName: userData.name, // assuming userData contains the user's name
        text: messageText,
        timestamp: new Date().toISOString(),
      };

      try {
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        console.log(messageText);

        await axios.post(
          //`http://127.0.0.1:8000/api/ride/${selectedRide.id}/message`,
          "https://run.mocky.io/v3/78dacaf3-1c32-4363-9808-89ce24338a55",
          // {
          //   message: messageText,
          // }
          newMessage
          // {
          //   headers: {
          //     Authorization: `Bearer ${access}`,
          //     "Content-Type": "application/json",
          //   },
          // }
        );
        setTimeout(() => {
          fetchMessages();
        }, 10000);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("User data is not loaded yet");
    }
  };

  if (error) {
    return <div>Error loading chat: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="chat">
      <div className="chat-container">
        <MessageList messages={messages} currentUserId={userData.id} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatComponent;
