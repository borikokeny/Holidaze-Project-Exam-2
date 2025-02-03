import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVenue } from "../api/venue";
import Ratings from "../components/Ratings";

function VenueForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [],
    price: "",
    maxGuests: "",
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
    },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const venueFormListener = async (e) => {
    e.preventDefault();

    const preparedData = {
      name: formData.name,
      description: formData.description,
      media: formData.media.length
        ? formData.media.split(",").map((url) => ({ url: url.trim() }))
        : [],

      price: parseFloat(formData.price) || 0,
      maxGuests: parseInt(formData.maxGuests, 10) || 0,
      rating: parseFloat(formData.rating) || 0,
      meta: {
        wifi: formData.meta.wifi,
        parking: formData.meta.parking,
        breakfast: formData.meta.breakfast,
        pets: formData.meta.pets,
      },
      location: {
        address: formData.location.address,
        city: formData.location.city,
        zip: formData.location.zip,
        country: formData.location.country,
        continent: formData.location.continent,
      },
    };

    try {
      await addVenue(preparedData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-main">
      <div className="flex flex-col items-center">
        <form
          onSubmit={venueFormListener}
          className="w-full max-w-lg bg-gray-100 border rounded-none p-6 shadow-md"
        >
          <h1 className="mb-4 text-xl md:text-2xl font-bold text-center">
            Add a Venue
          </h1>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name*"
            required
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description*"
            required
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="text"
            value={formData.media}
            onChange={(e) =>
              setFormData({ ...formData, media: e.target.value })
            }
            placeholder="Image URL*"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Price*"
            required
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="number"
            value={formData.maxGuests}
            onChange={(e) =>
              setFormData({ ...formData, maxGuests: e.target.value })
            }
            placeholder="Max Guests*"
            title="A venue must accommodate at least one guest."
            required
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <div className="mb-3">
            <Ratings
              rating={formData.rating}
              isInteractive={true}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, rating: value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={formData.meta.wifi}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta: { ...formData.meta, wifi: e.target.checked },
                  })
                }
                className="mr-2"
              />
              Wifi
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value={formData.meta.parking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta: { ...formData.meta, parking: e.target.checked },
                  })
                }
                className="mr-2"
              />
              Parking
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value={formData.meta.breakfast}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta: { ...formData.meta, breakfast: e.target.checked },
                  })
                }
                className="mr-2"
              />
              Breakfast
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value={formData.meta.pets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta: { ...formData.meta, pets: e.target.checked },
                  })
                }
                className="mr-2"
              />
              Pets
            </label>
          </div>
          <input
            type="text"
            value={formData.location.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, address: e.target.value },
              })
            }
            placeholder="Address"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="text"
            value={formData.location.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, city: e.target.value },
              })
            }
            placeholder="City"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="text"
            value={formData.location.zip}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, zip: e.target.value },
              })
            }
            placeholder="Zip"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <input
            type="text"
            value={formData.location.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, country: e.target.value },
              })
            }
            placeholder="Country"
            className="ps-2 block w-full rounded-none mb-3 border border-gray-300 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            className="w-full rounded-none bg-gray-700 px-4 py-2 text-white font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Publish Venue
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default VenueForm;