import React, { useState } from "react";
import "./Filter.css";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Filter() {
  const navigate = useNavigate();

  // Define the state for the search parameters
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceLimit, setPriceLimit] = useState("");

  // Handle the change in input fields and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setKeyword(value);
    } else if (name === "propertyType") {
      setPropertyType(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "priceLimit") {
      setPriceLimit(value);
    }
  };

  // Handle the search button click, construct query parameters, and navigate to the results page
  const handleSearchClick = () => {
    const params = new URLSearchParams({
      ...(keyword && { keyword }),
      ...(propertyType && { propertyType }),
      ...(location && { location }),
      ...(priceLimit && { priceLimit }),
    }).toString();

    // Navigate to the properties page with the search parameters
    navigate(`/properties?${params}`);
  };

  return (
    <div className="filter">
      <div className="bt">
        <Button text="Buy Properties" />
        <Button text="Rent Properties" />
      </div>

      <div className="searchbar container">
        <div className="option">
          <p className="mb-0">Enter Keyword</p>
          <div>
            <CiSearch />
            <input
              type="text"
              name="keyword"
              value={keyword}
              onChange={handleInputChange}
              placeholder="Enter Keyword"
            />
          </div>
        </div>

        <div className="option">
          <p className="mb-0">Property Type</p>
          <div>
            <select
              name="propertyType"
              value={propertyType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
        </div>

        <div className="option">
          <p className="mb-0">Location</p>
          <div>
            <IoLocationOutline />
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleInputChange}
              placeholder="Enter Location"
            />
          </div>
        </div>

        <div className="option prlt">
          <p className="mb-0">Price Limit</p>
          <div>
            <FaAngleDown />
            <input
              type="text"
              name="priceLimit"
              value={priceLimit}
              onChange={handleInputChange}
              placeholder="Enter Price"
            />
          </div>
        </div>

        <button onClick={handleSearchClick} className="option Search">
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default Filter;
