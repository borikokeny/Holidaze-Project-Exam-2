import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { removeVenue } from "../api/venue/addVenue";
import ReserveButton from "./ReserveButton";
import Media from "./media";
import placeholderImage from "../images/Placeholder.jpg";
import Ratings from "./ratings";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const VenueCard = ({ venue, onDeleteSuccess }) => {
  const {user} = useAuth();
  const userEmail = user?.data?.email;
  console.log("VenueCard user:", user);
  
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
    owner,
  } = venue;
  const [startDate, setStartDate] = useState(new Date());

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await removeVenue(id); 

       
        alert("Venue deleted successfully!");
        

        if (onDeleteSuccess) {
          onDeleteSuccess(id); 
          
        }
      } catch (error) {
        console.error("Error deleting venue:", error);
        alert(error.message || "Failed to delete the venue.");
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-2/5 bg-white p-4 mb-6">
        {media.length === 0 ? (
          <img src={placeholderImage} className="w-64" alt={name} />
        ) : (
          <>
            <Media
              media={[media[0]]}
              className="w-full h-64 object-cover mt-5 mb-4"
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

              {Array(3 - media.slice(1, 4).length)
                .fill()
                .map((_, index) => (
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
        <h1 className="mt-3 text-2xl font-bold text-stone-600">{name}</h1>
        <h2 className="w-4/6 text-justify text-lg mt-3 mb-3 text-stone-600">
          {description}
        </h2>
        <Ratings />
        <p className="font-bold mt-3 text-stone-600">{price} NOK / night</p>
        <p className="text-lg mb-3 text-stone-600">
          Max guests: {maxGuests} person
        </p>
        <p className="text-lg font-medium text-stone-600">This place offers:</p>
        <div className="table-row">
          <p className="table-cell pe-2">
            {(meta.wifi = true ? "Wifi" : "NO Wifi")}
          </p>
          <p className="table-cell pe-2">
            {(meta.parking = true ? "Parking" : "NO Parking")}
          </p>
          <p className="table-cell pe-2">
            {(meta.breakfast = true ? "Breakfast" : "NO Breakfast")}
          </p>
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
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <ReserveButton />
        {/* <button className="w-64 mt-2 rounded-none bg-sky-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60">Reserve</button> */}
        {userEmail === owner?.email && ( 
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default VenueCard;
