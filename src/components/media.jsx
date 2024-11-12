import React from "react";

function Media({ media, className="", useClipCustom = true }) {
  return (
    <div className={className}>
      {media.map((items, index) => {
        return (
          <div key={index}>
          <img src={items.url} alt={items.name} className={`w-80 h-48 object-cover transition-transform duration-300 hover:scale-105 ${
              useClipCustom ? "clip-custom" : ""
            }`} />
          </div>
        );
      })}
    </div>
  );
}

export default Media;
