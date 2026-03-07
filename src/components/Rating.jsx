import React from "react";
import { Star, StarHalf } from "lucide-react";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <div className="stars">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={12} fill="currentColor" />
      ))}
      {half && <StarHalf size={12} fill="currentColor" />}
    </div>
  );
}

export default StarRating;
