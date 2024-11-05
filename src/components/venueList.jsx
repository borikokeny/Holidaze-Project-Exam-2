import React from "react";
import Media from "./media";

const VenueList = ({ venues }) => {
  return (
    <div>
      {venues.map((venue) => {
        const { id, name, media, price } = venue;

        return (
          <div key={id}>
            <div>
              {media.length === 0 ? (
                <img src="src\images\images.png" />
              ) : (
                <Media key={media} media={media} />
              )}
            </div>
            <div>
              <h2>{name}</h2>
              <h3>{price} NOK / night</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VenueList;