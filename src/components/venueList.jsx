import React from "react";
import { Link } from "react-router-dom";
import Media from "./media";

const VenueList = ({ venues }) => {
  return (
    <div>
      {venues.map((venue) => {
        const { id, name, media, price, created } = venue;

        return (
          <div key={id}>
            <Link to={`/venuePage/${id}`}>
            <div className="card w-96 bg-slate-400 rounded-lg overflow-hidden shadow-lg">
              <div className="image-container relative overflow-hidden">
              {media.length === 0 ? (
                <img src="src\images\images.png" className="size-full block clip-custom bg-blue-500 p-4" />
              ) : (
                <Media key={media} media={media} />
              )}
              </div>
        
            </div>
              
            </Link>
            <div>
              <h2>{name}</h2>
              <h3>{price} NOK / night</h3>
              <h4>{created}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VenueList;
