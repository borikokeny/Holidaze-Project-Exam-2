import React from "react";
import { Link } from "react-router-dom";
import Media from "./media";

export default function VenueList({ venues }) {
  if (!venues || venues.length === 0) {
    return <p>No venues match your search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {venues.map((venue) => {
        const { id, name, media, price, created } = venue;

        return (
          <div key={id}>
            <Link to={`/venuePage/${id}`}>
              <div className="card w-60 bg-white overflow-hidden shadow-lg">
                <div className="image-container relative overflow-hidden">
                  {media.length === 0 ? (
                    <img
                      src="src/images/images.png"
                      alt="default"
                      className="w-64 h-48 block clip-custom"
                    />
                  ) : (
                    <Media media={[media[0]]} className="" />
                  )}
                </div>
                <div className="ms-6">
                  <h2>{name}</h2>
                  <h3>{price} NOK / night</h3>
                  <h4>{created}</h4>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
