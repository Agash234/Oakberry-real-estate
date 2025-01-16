const express = require("express");
const cors = require("cors");
const authroute = require("./routes/authroute");
const { connectDB } = require("./config/config");
const propertyroute = require("./routes/property");
const Agentrouter = require("./routes/Agentroute");
const Authticaterouter = require("./routes/authenticateroute");
const path = require("path");
const multer = require("multer");
const http = require("http");
const{Socket} = require("./controller/socket/socketintial");
// const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const {Server}=require('socket.io')


app.use(cors());
app.use(express.json());

app.use("/api/auth", authroute);
app.use("/api/property", propertyroute);
app.use("/api/agent", Agentrouter);
app.use("/api/refresh", Authticaterouter);
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "" + Date.now() + "" + file.originalname + ".png"
    );
    console.log(file.fieldname);
  },
});
const images = multer({ storage: storage });

app.post("/images", images.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.file.filename);
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  res.status(201).json({ imageUrl });
});

connectDB();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
Socket(io)


const port = 8000;
server.listen(port, () => {
  console.log(`the server is runing on ${port}`);
});
