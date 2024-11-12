import React from "react";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

const Ratings = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index} rating={index}>
        {rating > index + 1 ? (
          <TiStarFullOutline />
        ) : rating > number ? (
          <TiStarHalfOutline />
        ) : (
          <TiStarOutline />
        )}
      </span>
    );
  });
  return <div className="flex justify-start gap-2 items-center">{stars}</div>;
};

export default Ratings;

