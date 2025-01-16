import React from "react";
import moment from "moment";
import { MdOutlineBedroomChild } from "react-icons/md";
import { PiToilet } from "react-icons/pi";
import { FaHouseDamage } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import "./PropertyCard.css"; // Separate CSS for the card

function PropertyCard({ property }) {
  console.log(property);

  const propertyAgent = property.property_agent || {};
  const agentImage = propertyAgent.images || "/path/to/default-image.jpg"; // Replace with a valid default image path
  const agentName = propertyAgent.username || "Unknown Agent";

  return (
    <div className="feature-property-card">
      <div className="property_img">
        <img src={property.image || "/path/to/default-property.jpg"} alt={property.location || "Property"} />
        <div className="price_list">
          {property.discountPrice ? (
            <>
              <span className="ogprice-dimm">
                ${property.originalPrice?.toLocaleString() || 0}
              </span>
              <span className="offprice">
                ${property.discountPrice?.toLocaleString() || 0}
              </span>
            </>
          ) : (
            <span className="ogprice">
              ${property.originalPrice?.toLocaleString() || 0}
            </span>
          )}
        </div>
      </div>
      <div className="all_details">
        <div className="details_top">
          <div className="agent_details">
            <img src={agentImage} alt={agentName} />
            <p>{agentName}</p>
          </div>
          <p className="date">{moment(property.createdAt).fromNow()}</p>
        </div>
        <div className="all_property_details">
          <div className="property_details">
            <p className="pname">{property.title || "Unnamed Property"}</p>
            <div className="plocation">
              <p className="picon">
                <MdLocationPin color="green" />
                {property.location || "Unknown Location"}
                <span className={property.type === "Sale" ? "sale" : "rent"}>
                  {property.saleStatus || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div className="property_size">
            <div className="icons">
              <MdOutlineBedroomChild />
              <p>{property.beds || 0}</p>
            </div>
            <div className="icons">
              <PiToilet />
              <p>{property.baths || 0}</p>
            </div>
            <div className="icons">
              <FaHouseDamage />
              <p>{property.area?.toLocaleString() || 0} Sqft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
