import React from "react";
import Media from "./media";
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
      <p>{meta.wifi = true ? "Wifi" : "NO Wifi"}</p>
      <p>{meta.parking = true ? "Parking" : "NO Parking"}</p>
      <p>{meta.breakfast = true ? "Breakfast" : "NO Breakfast"}</p>
      <p>{meta.pets = true ? "Pets allowed" : "Sorry pets are not allowed"}</p>
      {media.length === 0 ? (
        <img src="src\images\images.png" />
      ) : (
        <Media key={media} media={media} />
      )}
    </div>
  );
};

export default VenueCard;
