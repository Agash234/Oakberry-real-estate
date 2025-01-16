const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    property_agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    image: { type: String },
    originalPrice: { type: String, required: true },
    discountPrice: { type: String, required: true },

    title: { type: String, required: true },
    location: { type: String, required: true },
    saleStatus: { type: String, required: true },
    beds: { type: String, required: true },
    baths: { type: String, required: true },
    area: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("property", productSchema);
