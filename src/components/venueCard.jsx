import React from "react";
import Media from "./media";
import placeholderImage from "../images/Placeholder.jpg";

//*import Ratings
//*import Reviews

const VenueCard = ({ venue }) => {
  const {
    id,
    name,
    description,
    media,
    price,
    maxGuests,
    rating,
    created,
    updated,
    meta,
    location,
  } = venue;

  return (
    <div className="flex">
      <div className="venue-card bg-white shadow-md rounded-lg p-4 mb-6">
        {media.length === 0 ? (
          <img src={placeholderImage} className="w-64" alt={name} />
        ) : (
          <>
            <Media
              media={[media[0]]}
              className="w-full h-64 object-cover mb-4"
              useClipCustom={false}
            />

            <div className="flex gap-2">
            {media.slice(1, 4).map((image, index) => (
                <Media
                  key={index}
                  media={[image]}
                  className="w-1/3 h-24 object-cover rounded-md"
                  alt={name}
                  useClipCustom={false}
                />
              ))}

              {/* Display placeholders for any remaining spots up to 3 */}
              {Array(3 - media.slice(1, 4).length).fill().map((_, index) => (
                <img
                  key={`placeholder-${index}`}
                  src={placeholderImage}
                  className="w-1/3 h-24 object-cover rounded-md"
                  alt={`${name} placeholder`}
                />
              ))}
            </div>
          </>
        )}
        </div>

        <div>
          <h2>{name}</h2>
          <h3>{description}</h3>
          <p>{price} NOK / night</p>
          <p>max Guests: {maxGuests} person</p>
          <p>{created}</p>
          <p>{updated}</p>
          <p>Address: {location.address}</p>
          <p>City: {location.city}</p>
          <p>ZIP: {location.zip}</p>
          <p>Country: {location.country}</p>
          <p>Continent: {location.continent}</p>
          <p>{(meta.wifi = true ? "Wifi" : "NO Wifi")}</p>
          <p>{(meta.parking = true ? "Parking" : "NO Parking")}</p>
          <p>{(meta.breakfast = true ? "Breakfast" : "NO Breakfast")}</p>
          <p>
            {(meta.pets = true ? "Pets allowed" : "Sorry pets are not allowed")}
          </p>
        </div>
      
    </div>
  );
};

export default VenueCard;
