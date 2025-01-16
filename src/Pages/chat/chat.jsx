import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./chat.css";
import CryptoJS from "crypto-js";

const socket = io("http://localhost:8000");

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const receiverId = queryParams.get("receiverId");
  const userId = localStorage.getItem("userId");
  const secretKey = "udhgiuhgiufdhgiuh";
  const roomID = queryParams.get("roomName");

  const encryptedAgentId = decodeURIComponent(receiverId);
  const bytes = CryptoJS.AES.decrypt(encryptedAgentId, secretKey);
  const decryptedAgentId = bytes.toString(CryptoJS.enc.Utf8);
  const roomName = roomID || `${userId}-${decryptedAgentId}`;

  const agentUsername = queryParams.get("username");

  useEffect(() => {
    // Join the room
    socket.emit("join_room", { roomName });
    socket.on("previous_messages", (messages) => {
      setMessages(messages); // Set all previous messages
    });

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
      socket.off("disconnect");
    };
  }, [roomName]);

  const sendMessage = () => {
    if (!message.trim()) return; // Prevent empty messages

    const data = {
      senderId: userId,
      roomName,
      message,
    };

    // Emit the message to the server
    socket.emit("send_message", data);

    // Clear the input field
    setMessage("");
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-left">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="Receiver"
            className="receiver-img"
          />
          <span className="receiver-name">{agentUsername}</span>
        </div>
      </div>

      <div className="chat-messages">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`chat-message ${
        msg.senderId === userId ? "self" : "other"
      }`}
    >
      {msg.senderId === userId
        ? `You: ${msg.message || "Message not found"}`
        : `Server: ${msg.message || "Message not found"}`}
    </div>
  ))}
</div>


      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
