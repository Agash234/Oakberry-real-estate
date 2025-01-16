const Property = require("../model/productSchema");
const jwt = require("jsonwebtoken");
const { privatekey } = require("../config/config");
const Agent=require('../model/userSchema')

exports.addProperty = async (req, res) => {
  try {
    const {
      property_agent,
      image,
      originalPrice,
      discountPrice,
      title,
      location,
      saleStatus,
      beds,
      baths,
      area,
    } = req.body;
    console.log(req.body);
    console.log(property_agent);

    const userid = jwt.verify(property_agent, privatekey);

    const agentid = userid.user;
    console.log(agentid);

    let property = await Property.create({
      property_agent: agentid,
      image,
      originalPrice,
      discountPrice,
      title,
      location,
      saleStatus,
      beds,
      baths,
      area,
    });

await Agent.findByIdAndUpdate(agentid,{$inc:{property_list: 1}})

    return res
      .status(201)
      .json({ msg: "Property added Succesfully", data: property });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
}

exports.getproperty = async (req, res) => {
  try {
    // Destructure query parameters from the request
    const { keyword, propertyType, location, priceLimit } = req.query;

    // Build the filter object
    const filter = {};

    if (keyword) {
      // Assuming "name" or "description" field is used for keyword search
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },

      ];
    }

    if (propertyType) {
      filter.saleStatus = propertyType; // Ensure propertyType is a valid field in your model
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (priceLimit) {
      filter.originalPrice = { $lte: parseFloat(priceLimit) };
    }

    // Fetch properties based on filters
    const properties = await Property.find(filter).populate(
      "property_agent",
      "username images"
    );
    console.log(properties)

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

