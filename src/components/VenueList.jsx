import React from "react";
import { Link } from "react-router-dom";
import Media from "./media";
import { LuMapPin } from "react-icons/lu";
import { countries } from "./Countries";

const getCountries = () => {
  return countries[Math.floor(Math.random() * countries.length)];
}

export default function VenueList({ venues }) {
  if (!venues || venues.length === 0) {
    return <p>No venues match your search.</p>;
  }

  return (
    <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {venues.map((venue) => {
        const { id, name, media, price, location } = venue;

        // let createdDate = "N/A";
        // if (created) {
        //   let createdDateObj = new Date(created);
        //   createdDate = createdDateObj.toLocaleDateString();
        // }

        return (
          <div key={id}>
            <Link to={`/venuePage/${id}`}>
              <div className="card w-60 bg-white overflow-hidden">
                <div className="image-container relative overflow-hidden">
                  {media.length === 0 ? (
                    <img
                      src="src/images/images.png"
                      alt="default"
                      className="w-64 h-48 block"
                    />
                  ) : (
                    <Media media={[media[0]]} className="" />
                  )}
                </div>
                <div className="text-stone-800">
                  <h1 className="font-semibold mt-1">{name}</h1>
                  <div className="flex items-center">
                  <LuMapPin className="items-center  me-1"/>
                  <h3>{location.country || getCountries()}</h3>
                  </div>
                  <h3><strong>{price} nok</strong>/night</h3>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
