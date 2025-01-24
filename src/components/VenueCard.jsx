import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { removeVenue } from "../api/venue";
import { useNavigate } from "react-router-dom";
import { MdOutlinePets, MdFreeBreakfast } from "react-icons/md";
import { FaWifi, FaParking } from "react-icons/fa";
import { Carousel } from "@material-tailwind/react";
import placeholderImage from "../images/Placeholder.jpg";
import Ratings from "./Ratings";
import Modal from "./Modal";
import VenueUpdateForm from "./VenueUpdateForm";
import "react-datepicker/dist/react-datepicker.css";
import { LuMapPin } from "react-icons/lu";
import { getCountries, getAddress } from "./Countries";
import BookingForm from "./BookingForm";

const getLocation = (location) => {
  const randomAddress = getAddress();
  const randomCountry = getCountries();

  return {
    address: location?.address || randomAddress.address,
    city: location?.city || randomAddress.city,
    zip: location?.zip || randomAddress.zip,
    country: location?.country || randomCountry,
  };
};

const VenueCard = ({ venue, onDeleteSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userEmail = user?.email;

  const [openModal, setOpenModal] = useState(false);

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

  const randomLocation = getLocation(location);

  const openForm = () => {
    setOpenModal(true);
  };

  const closeForm = () => {
    setOpenModal(false);
  };

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
    <div className="font-main">
      <div className=" bg-white p-4">
        {Array.isArray(media) && media.length > 0 ? (
          <Carousel className="w-full h-96">
            {media.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${name} image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        ) : (
          <img
            src={placeholderImage}
            className="w-full h-64 object-cover rounded-xl"
            alt={`${name} placeholder`}
          />
        )}
      </div>

      <div className="flex ms-4">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-stone-600">{name}</h1>
          <div className="flex items-center">
            <LuMapPin className="items-center  me-1" />
            <h3>{randomLocation.country}</h3>
          </div>
          <h2 className="w-4/6 text-justify text-lg mt-3 mb-3 text-stone-600">
            {description}
          </h2>
          <hr className="border-t-2 border-gray-300 mb-1 w-4/6" />

          <div className="flex items-center">
            <div className="">
              <img
                src={owner.avatar.url}
                alt="Avatar"
                className="object-cover rounded-full mt-1 w-12 h-12"
              />
            </div>
            <div className="ms-5 mt-2">
              <p>Hosted by {owner.name}</p>
              <p>{owner.email}</p>
            </div>
          </div>

          <hr className="border-t-2 border-gray-300 mt-3 mb-3 w-4/6" />
          <Ratings rating={venue.rating} />

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
          <p className="">{randomLocation.address}</p>
          <p className="text-stone-600">{randomLocation.city}</p>
          <p className="text-stone-600">{randomLocation.zip}</p>
          <p className="text-stone-600">{randomLocation.country}</p>
        </div>
        <div className="w-1/2">
          <div className="flex justify-end me-4 mb-3">
            {userEmail === owner?.email && (
              <div>
                <button
                  onClick={openForm}
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-400"
                >
                  Edit Venue
                </button>
                <button
                  onClick={handleDelete}
                  className="mt-4 ms-2 px-4 py-2 border-2 border-neutral-400 text-gray-600 rounded hover:bg-red-400 hover:text-gray-900"
                >
                  Delete Venue
                </button>
              </div>
            )}
          </div>

          <BookingForm venue={venue} />
        </div>

        {openModal && (
          <Modal onClose={closeForm}>
            <VenueUpdateForm venue={venue} onClose={closeForm} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VenueCard;


