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
      {media.length === 0 ? (
        <img src="src\images\images.png" />
      ) : (
        <Media key={media} media={media} />
      )}
    </div>
  );
};

export default VenueCard;
