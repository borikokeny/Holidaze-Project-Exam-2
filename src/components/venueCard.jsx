import React from "react";
import Media from "./media";
import placeholderImage from "../images/Placeholder.jpg";
import Ratings from "./ratings";

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
    location
  } = venue;

  return (
    <div className="flex">
      <div className="w-2/5 bg-white p-4 mb-6">
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

              {Array(3 - media.slice(1, 4).length).fill().map((_, index) => (
                <img
                  key={`placeholder-${index}`}
                  src={placeholderImage}
                  className="w-1/4 h-36 object-cover"
                  alt={`${name} placeholder`}
                />
              ))}
            </div>
          </>
        )}
        </div>

        <div className="w-3/5">
          <h1 className="text-2xl font-bold">{name}</h1>
          <h2 className="text-lg mb-3">{description}</h2>
          <Ratings />
          <p className="font-bold mt-3">{price} NOK / night</p>
          <p className="text-lg mb-3">Max guests: {maxGuests} person</p>
          <p className="text-lg font-medium">This place offers:</p>
          <div className="table-row">
          <p className="table-cell pe-2">{(meta.wifi = true ? "Wifi" : "NO Wifi")}</p>
          <p className="table-cell pe-2">{(meta.parking = true ? "Parking" : "NO Parking")}</p>
          <p className="table-cell pe-2">{(meta.breakfast = true ? "Breakfast" : "NO Breakfast")}</p>
          <p className="table-cell pe-2">
            {(meta.pets = true ? "Pets allowed" : "Sorry pets are not allowed")}
          </p>
          </div>
          
          <p className="text-lg font-medium mt-3">Address: </p>
          <p className="">{location.address}</p>
          <p>{location.city}</p>
          <p>{location.zip}</p>
          <p>{location.country}</p>
          <p>{location.continent}</p>

          
        
        </div>
      
    </div>
  );
};

export default VenueCard;
