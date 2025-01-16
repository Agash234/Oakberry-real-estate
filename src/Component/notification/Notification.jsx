import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import CryptoJS from 'crypto-js';


const socket = io('http://localhost:8000'); // Connect to the server

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  console.log(notifications)

  // Assuming agentId is stored in localStorage
   // Same secret key for encryption

  useEffect(() => {

    // Listen for new notifications from the backend
    socket.on('new_notification', (data) => {
        console.log(data,"........")
      setNotifications((prev) => [...prev, {message:data.message,roomName:data.roomName,sendername:data.senderName,senderId:data.senderId}]);
     
    });

    // Join the agent's room when they login
  
    return () => {
      socket.off('new_notification');
    };
  }, []);

  const handleNotificationClick = (roomName,user) => {
    console.log(roomName,user)
    alert("svjhcvscjhcs")
    // Join the room and redirect to chat
    // socket.emit('join_room', { roomName });
    window.location.href = `/chat?roomName=${roomName}&username=${user}`;
  };

  return (
    <div className="agent-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="notifications">
        <h3>Notifications</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              notification.senderId?(
              <li key={index} onClick={() => handleNotificationClick(notification.roomName , notification.sendername)}>
                {notification.message}
                {notification.senderName}
              </li>
              ):null
              
            ))}
          </ul>
        ) : (
          <p>No new notifications</p>
        )}
      </div>
     
    </div>
  );
};

export default Notification;
