import React from "react";

function Media({ media }) {
  return (
    <div>
      {media.map((items, index) => {
        return (
          <div key={index}>
          <img src={items.url} alt={items.name} className="w-96 h-48 object-cover transition-transform duration-300 hover:scale-105" />
          </div>
        );
      })}
    </div>
  );
}

export default Media;
