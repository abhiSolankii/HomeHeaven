import React from "react";
import {
  FaBath,
  FaBed,
  FaBookmark,
  FaComment,
  FaLocationArrow,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden w-full h-[14rem] flex">
      <div className="w-1/3">
        <Link to={`/${item.id}`}>
          <img
            src={item.images[0]}
            alt={item.title}
            className="object-cover w-full h-full overflow-hidden transform transition-transform duration-300 md:hover:scale-90"
          />
        </Link>
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="mb-2 flex flex-col gap-4">
          <Link to={`/${item.id}`}>
            <h2 className="text-xl font-semibold  hover:text-yellow-500">
              {item.title}
            </h2>
          </Link>
          <p className="text-gray-600 flex gap-1 items-center">
            <FaLocationArrow size={20} />
            {item.address}
          </p>
          <p className="text-gray-800 font-bold">
            ${item.price.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-700 flex flex-row gap-3">
            <div className="flex flex-row gap-1 items-center bg-gray-200 rounded-lg p-1">
              <FaBed size={20} />
              {item.bedroom}

              <h1>Bedrooms</h1>
            </div>
            <div className="flex flex-row gap-1 items-center bg-gray-200 rounded-lg p-1">
              <FaBath size={20} />
              {item.bathroom}

              <h1>Bathrooms</h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-yellow-500">
              <FaBookmark size={20} />
            </button>
            <button className="text-gray-600 hover:text-yellow-500">
              <FaComment size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
