const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
    message: { type: String, required: true },
    roomName:{type:String,required:true},
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification