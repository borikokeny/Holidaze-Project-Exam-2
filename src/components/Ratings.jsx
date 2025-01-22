import React from "react";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

const Ratings = ({ rating, onChange, isInteractive = false }) => {
  const handleRating = (value) => {
    if (isInteractive && onChange) {
      onChange(value);
    }
  }
  const stars = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span 
      key={index} 
      rating={index}
      className={`cursor-pointer ${isInteractive ? "hover:text-teal-500" : ""}`}
        onClick={() => handleRating(index + 1)}
      >
        {rating > index + 1 ? (
          <TiStarFullOutline className="text-stone-600" />
        ) : rating > number ? (
          <TiStarHalfOutline className="text-stone-600" />
        ) : (
          <TiStarOutline className="text-stone-600" />
        )}
      </span>
    );
  });
  return <div className="flex justify-start gap-2 items-center">{stars}</div>;
};

export default Ratings;

