import React from "react";
import { Link } from "react-router-dom";
import Media from "./Media";
import { LuMapPin } from "react-icons/lu";
import { getCountries } from "./Countries";

export default function VenueList({ venues }) {
  if (!venues || venues.length === 0) {
    return <p>No venues match your search.</p>;
  }

  const randomCountry = getCountries();

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {venues.map((venue) => {
        const { id, name, media, price, location } = venue;
        return (
          <div key={id} className="flex justify-center">
            <Link to={`/venuePage/${id}`} className="w-full max-w-xs">
              <div className="card bg-white rounded-none shadow-lg overflow-hidden">
                <div className="image-container relative overflow-hidden">
                  {media.length === 0 ? (
                    <img
                      src="src/images/images.png"
                      alt="default"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <Media
                      media={[media[0]]}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <div className="p-4 text-gray-800">
                  <h1 className="font-semibold text-base text-nowrap md:text-lg">
                    {name}
                  </h1>
                  <div className="flex items-center text-sm md:text-base mt-2">
                    <LuMapPin className="mr-1" />
                    <h3>{location.country || randomCountry}</h3>
                  </div>
                  <h3 className="mt-1 text-sm md:text-base">
                    <strong>{price} NOK</strong> / night
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
