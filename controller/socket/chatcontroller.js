// socket/socketController.js
const Message = require("../../model/chatstore"); 
const Notification =require("../../model/notification");
const User =require("../../model/userSchema");

// Handle the socket events
exports.handleConnections = (socket, io) => {
  console.log("A user connected");

  // Handle sending a message
  socket.on("send_message", async (data) => {
    const { senderId, roomName, message } = data;
    console.log(data);
    const sender = await User.findById(senderId);
    const senderName = sender ? sender.username : "Unknown Sender";

    // Save the message to the database
    const newMessage = new Message({
      senderId,
      receiverId: roomName,
      message,
    });
    await newMessage.save();

    // Emit the message to the receiver
    io.to(roomName).emit("receive_message", { senderId,message});

    const receiverId = roomName.split('-')[1];
    console.log(receiverId,"..........") ;
    console.log(senderId,".......");// Extract agent ID from roomName
    const newNotification = new Notification({
      agentId: receiverId,
      message: `New message from user ${senderId}`,
      roomName,
      timestamp: new Date(),
    });
    await newNotification.save();

    console.log(io.emit('new_notification', {
      roomName,
      message: `New message from user ${senderId}`,
      senderName,
      senderId
    }));
  });

  // Handle joining a room
  socket.on("join_room", async ({ roomName }) => {
    console.log("room join");
    socket.join(roomName);
    const previousMessages = await Message.find({ receiverId: roomName });

    // Send all previous messages to the client who joined the room
    socket.emit("previous_messages", previousMessages);


  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
};
