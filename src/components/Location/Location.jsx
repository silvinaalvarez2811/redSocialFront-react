import React from "react";
import { GrLocation } from "react-icons/gr";
function Location({ location }) {
  if (!location) return null;

  return (
    <div className="flex items-center border-gris-oscuro-2 border-1 pr-3 pl-3 p-2 rounded-full gap-2 text-gris-oscuro-2 text-lg font-bold ">
      <GrLocation size={20} />
      <span> {location}</span>
    </div>
  );
}

export default Location;
