import { Link } from "react-router-dom";
import React from "react";
import { Marker, Popup } from "react-leaflet";

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex flex-row gap-2 font-serif w-[15rem]">
          <div className="w-1/3">
            <img
              src={item.images[0]}
              alt={item.title}
              className="object-cover overflow-hidden w-full h-full rounded-md"
            />
          </div>
          <div className="w-2/3 flex flex-col gap-2">
            <Link
              to={`/${item.id}`}
              className="whitespace-nowrap text-sm overflow-hidden"
            >
              {item.title}
            </Link>
            <h1>{item.bedroom} Bedrooms</h1>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
