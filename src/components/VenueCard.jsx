import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateVenue, removeVenue } from "../api/venue";
import { useNavigate } from "react-router-dom";
import { MdOutlinePets, MdFreeBreakfast } from "react-icons/md";
import { FaWifi, FaParking } from "react-icons/fa";
import ReserveButton from "./ReserveButton";
import { Carousel } from "@material-tailwind/react";
// import Media from "./media";
import placeholderImage from "../images/Placeholder.jpg";
import Ratings from "./ratings";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-bootstrap";

const VenueCard = ({ venue, onDeleteSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userEmail = user?.email;
  console.log("VenueCard user:", user);
  console.log("userEmail:", userEmail);

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

  const ownerEmail = owner.email;
  console.log("owner.email:", ownerEmail);

  const [startDate, setStartDate] = useState(new Date());

  const handleUpdate = async () => {};

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await removeVenue(id);
        alert("Venue deleted successfully!");

        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
        navigate("/");
      } catch (error) {
        console.error("Error deleting venue:", error);
        alert(error.message || "Failed to delete the venue.");
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-2/5 bg-white p-4 mb-6">
      {Array.isArray(media) && media.length > 0 ? (
    <Carousel className="rounded-xl w-full h-64">
      {media.map((image, index) => (
        <img
          key={index}
          src={image.url} // Ensure each media object has a 'url' property
          alt={`${name} image ${index + 1}`} // Add fallback alt text
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  ) : (
    <img src={placeholderImage} className="w-full h-64 object-cover rounded-xl" alt={`${name} placeholder`} />
  )}


        {/* {media.length === 0 ? (
          <img src={placeholderImage} className="w-64" alt={name} />
        ) : (
          <Carousel className="rounded-xl w-full h-64">
          {media.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${image.name} image ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
          // <>
          //   <Media
          //     media={[media[0]]}
          //     className="w-full h-64 object-cover mt-5 mb-4"
          //     useClipCustom={false}
          //   />

          //   <div className="flex gap-2">
          //     {media.slice(1, 4).map((image, index) => (
          //       <Media
          //         key={index}
          //         media={[image]}
          //         className="w-1/3 h-24 object-cover rounded-md"
          //         alt={name}
          //         useClipCustom={false}
          //       />
          //     ))}

          //     {Array(3 - media.slice(1, 4).length)
          //       .fill()
          //       .map((_, index) => (
          //         <img
          //           key={`placeholder-${index}`}
          //           src={placeholderImage}
          //           className="w-1/4 h-36 object-cover"
          //           alt={`${name} placeholder`}
          //         />
          //       ))}
          //   </div>
          // </>
        )} */}
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
        <p className="text-lg font-medium text-stone-600 mb-3">
          This place offers:
        </p>
        <div className="table-row">
          <div className="">
            <p className="flex pe-2">
              <FaWifi className="mt-1 me-3 mb-3 text-teal-500" />
              {meta.wifi ? "Wifi" : "NO Wifi"}
            </p>
            <p className="flex pe-2">
              <FaParking className="mt-1 me-3 text-teal-500" />
              {meta.parking ? "Parking" : "NO Parking"}
            </p>
          </div>

          <div className="table-cell">
            <p className="flex pe-2">
              <MdFreeBreakfast className="mt-1 me-3 mb-3 text-teal-500" />
              {meta.breakfast ? "Breakfast" : "Breakfast is not included"}
            </p>
            <p className="flex pe-2">
              <MdOutlinePets className="mt-1 me-3 text-teal-500" />
              {meta.pets ? "Pets allowed" : "Sorry, pets are not allowed"}
            </p>
          </div>
        </div>

        <p className="text-lg font-medium mt-3 text-stone-600">Address: </p>
        <p className="">{location.address}</p>
        <p className="text-stone-600">{location.city}</p>
        <p className="text-stone-600">{location.zip}</p>
        <p className="text-stone-600">{location.country}</p>
        <p className="text-stone-600">{location.continent}</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="text-stone-600"
        />
        <ReserveButton />
        {userEmail === owner?.email && (
          <div>
            <button
              onClick={handleUpdate}
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-red-600"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCard;
