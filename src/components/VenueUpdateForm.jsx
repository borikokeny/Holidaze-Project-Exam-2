import React, { useState } from "react";
import { updateVenue } from "../api/venue";
import Ratings from "./ratings";
import { Rating } from "@material-tailwind/react";

const VenueUpdateForm = ({ venue, onClose }) => {
  const [formData, setFormData] = useState({
    name: venue?.name || "",
    description: venue?.description || "",
    media: venue?.media || [],
    price: venue?.price || "",
    maxGuests: venue?.maxGuests || "",
    rating: venue?.rating || 0,
    meta: {
      wifi: venue?.meta?.wifi || false,
      parking: venue?.meta?.parking || false,
      breakfast: venue?.meta?.breakfast || false,
      pets: venue?.meta?.pets || false,
    },
    location: {
      address: venue?.location?.address || "",
      city: venue?.location?.city || "",
      zip: venue?.location?.zip || "",
      country: venue?.location?.country || "",
    },
  });

  const handleNewInput = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      if (keys.length === 1) {
        if (name === "media") {
          return {
            ...prev,
            media: value.split(",").map((url) => ({ url: url.trim() })),
          };
        }
        return { ...prev, [name]: type === "checkbox" ? checked : value };
      } else if (keys.length === 2) {
        const [parent, child] = keys;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        };
      }
      return prev;
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
    };

    try {
      await updateVenue(venue.id, preparedData);
      alert("Venue updated successfully!");
      onClose;
      window.location.reload();
    } catch (error) {
      console.error("Error updating venue:", error);
      alert(error.message || "Failed to update the venue.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleNewInput}
          className="border p-2 w-full"
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleNewInput}
          className="border p-2 w-full"
        />
      </label>
      <label>
        Image URLs (add comma between the URLs):
        <textarea
          type="text"
          name="media"
          value={formData.media.map((mediaObj) => mediaObj.url).join(", ")}
          onChange={handleNewInput}
          className="border p-2 w-full"
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleNewInput}
          className="border p-2 w-full"
        />
      </label>
      <label>
        Max Guests:
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleNewInput}
          className="border p-2 w-full"
        />
      </label>
      <Ratings 
      rating={formData.rating}
      isInteractive={true}
      onChange={(value) =>
        setFormData((prev) => ({
          ...prev,
          rating: value,
        }))
      }
      />
      <div className="flex mt-2">
        <label className="me-2">
          <input
            type="checkbox"
            name="meta.wifi"
            checked={formData.meta.wifi}
            onChange={handleNewInput}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            name="meta.parking"
            checked={formData.meta.parking}
            onChange={handleNewInput}
          />
          Parking
        </label>
      </div>
      <div>
        <label className="me-2">
          <input
            type="checkbox"
            name="meta.breakfast"
            checked={formData.meta.breakfast}
            onChange={handleNewInput}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            name="meta.pets"
            checked={formData.meta.pets}
            onChange={handleNewInput}
          />
          Pets
        </label>
      </div>
      <label>
        Address:
        <input
          type="text"
          name="location.address"
          value={formData.location.address}
          onChange={handleNewInput}
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="location.city"
          value={formData.location.city}
          onChange={handleNewInput}
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
      </label>
      <label>
        ZIP:
        <input
          type="text"
          name="location.zip"
          value={formData.location.zip}
          onChange={handleNewInput}
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="location.country"
          value={formData.location.country}
          onChange={handleNewInput}
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
      </label>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-green-700"
      >
        Update Venue
      </button>
    </form>
  );
};

export default VenueUpdateForm;
