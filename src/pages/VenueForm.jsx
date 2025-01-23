import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVenue } from "../api/venue";
import Ratings from "../components/ratings";

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
    <div className="justify-center w-3/5 font-main">
      <div>
        <form onSubmit={venueFormListener} className="flex mt-3 mb-3 pe-8">
          <div className="border w-2/3 rounded-md p-6 bg-gray-100">
            <h1 className="mb-3 text-2xl">Add a Venue</h1>
            <input
              type="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name*"
              required
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description*"
              required
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              value={formData.media}
              onChange={(e) =>
                setFormData({ ...formData, media: e.target.value })
              }
              placeholder="Image URL*"
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
            />
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price*"
              required
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
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
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
            />
            <Ratings
              rating={formData.rating}
              isInteractive={true}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, rating: value }))
              }
            />
            <div className="flex">
              <label className="me-2">
                <input
                  type="checkbox"
                  value={formData.meta.wifi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, wifi: e.target.checked },
                    })
                  }
                />
                Wifi
              </label>
              <label>
                <input
                  type="checkbox"
                  value={formData.meta.parking}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, parking: e.target.checked },
                    })
                  }
                />
                Parking
              </label>
            </div>
            <div className="mb-2">
              <label className="me-2">
                <input
                  type="checkbox"
                  value={formData.meta.breakfast}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, breakfast: e.target.checked },
                    })
                  }
                />
                Breakfast
              </label>
              <label>
                <input
                  type="checkbox"
                  value={formData.meta.pets}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meta: { ...formData.meta, pets: e.target.checked },
                    })
                  }
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
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
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
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
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
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
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
              className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
            />
            <div>
              <button
                type="submit"
                className="w-full mt-2 rounded-none bg-gray-700 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
              >
                Publish Venue
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VenueForm;
