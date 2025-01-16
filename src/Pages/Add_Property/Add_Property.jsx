import React, { useEffect, useState } from "react";
import "./Add_Property.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import PropertyCard from "../../Component/Properties_card/PropertyCard";
// import secureinstance from "../../Interceptor/Interceptor";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add_Property() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  console.log(Token);
  useEffect(() => {
    if (!Token) {
      navigate("/login");
    }
  }, [navigate]);

  const [propertyDetails, setPropertyDetails] = useState({
    property_agent: Token,
    title: "",
    originalPrice: "",
    discountPrice: "",
    location: "",
    saleStatus: "",
    beds: "",
    baths: "",
    area: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is a file input for "image"
    if (name === "image" && files) {
      setPropertyDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0], // Store the file object instead of its value
      }));
    } else {
      // Convert numeric values to numbers for specific fields
      const newValue = [
        "beds",
        "baths",
        "originalPrice",
        "discountPrice",
        "area",
      ].includes(name)
        ? Number(value)
        : value;

      setPropertyDetails((prevDetails) => ({
        ...prevDetails,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(propertyDetails);
    e.preventDefault();
    console.log("Property details before submitting:", propertyDetails);
    const formData = new FormData();

    // Append all property details to formData
    console.log(propertyDetails.image);
    formData.append("file", propertyDetails.image);

    try {
      // Upload image to the backend
      const imageResponse = await axios.post(
        "http://localhost:8000/images", // Backend URL for uploading the image
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(imageResponse.data);
      const imageUrl = imageResponse.data.imageUrl;
      console.log(imageUrl);
      formData.append("image", imageUrl);
      for (let [key, values] of formData.entries()) {
        console.log(key, values);
      }
      console.log(formData);

      const requestData = {
        property_agent: propertyDetails.property_agent,
        title: propertyDetails.title,
        originalPrice: propertyDetails.originalPrice,
        discountPrice: propertyDetails.discountPrice,
        location: propertyDetails.location,
        saleStatus: propertyDetails.saleStatus,
        beds: propertyDetails.beds,
        baths: propertyDetails.baths,
        area: propertyDetails.area,
        image: imageUrl, // Send Base64 image data
      };
      console.log(requestData);
      const propertyResponse = await axios.post(
        "http://localhost:8000/api/property/addproperty",
        requestData,
      );

      console.log("Property added successfully:", propertyResponse);
      alert("Successfully added property!");
	  setPropertyDetails(" ")
    } catch (err) {
      console.error("Error uploading property:", err);
      alert("Error Property is not added successfully");
    }
  };
  return (
    <div className="parent_add_property">
      <Header />
      <div className="property_get">
        <div className="property_first">
          <h1>
            <i className="fa-solid fa-puzzle-piece"></i>ADD PROPERTY FOR
            <p> SALES OR RENTAL</p>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="input_fields">
              <label htmlFor="propertyname">Property Name</label>
              <input
                type="text"
                name="title"
                value={propertyDetails.title}
                id="title"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="ogprice">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={propertyDetails.originalPrice}
                id="originalPrice"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="offprice">Offered Price</label>
              <input
                type="number"
                name="discountPrice"
                value={propertyDetails.discountPrice}
                id="discountPrice"
                onChange={handleChange}
              />
            </div>
            <div className="input_fields">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={propertyDetails.location}
                id="location"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="type">Type</label>
              <select
                name="saleStatus"
                value={propertyDetails.saleStatus}
                id="saleStatus"
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="Sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="input_fields">
              <label htmlFor="bdroom">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={propertyDetails.beds}
                id="beds"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="bhroom">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={propertyDetails.baths}
                id="baths"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="size">area (in sq. ft.)</label>
              <input
                type="number"
                name="area"
                value={propertyDetails.area}
                id="area"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_fields">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange} // Handle file change event
                required // Optionally, make this field required
              />
            </div>

            <button id="submit_bt" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="property_second">
          {Token ? <PropertyCard property={propertyDetails} /> : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Add_Property;
