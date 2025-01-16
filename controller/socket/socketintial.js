// socket/socketServer.

const Socket=(io)=>{
// Initialize socket.io with the server

  // Import Socket.io event handlers
  const {handleConnections}  = require("./chatcontroller");

  // Set up connection event and handle other events
  io.on("connection", (socket) => {
    handleConnections(socket, io);  // Pass the `io` instance to the handler
  });

};
module.exports={Socket}
