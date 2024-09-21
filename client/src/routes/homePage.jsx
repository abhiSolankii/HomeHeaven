import React, { useContext } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const [query, setQuery] = useState({
    type: "",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const switchActive = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  // console.log(query);

  const handleChange = async (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  return (
    <>
      <div className="flex">
        <div className="w-full p-4">
          <div className="mt-20 md:mt-40 space-y-4">
            <h1 className="font-serif font-bold lg:text-6xl text-4xl text-center">
              Find Real Estate & Get
            </h1>
            <h1 className="font-serif font-bold lg:text-6xl text-4xl text-center">
              Your Dream Place
            </h1>
            <h1 className="">
              Welcome to HomeHaven, your premier destination for finding the
              perfect home. Explore a wide range of properties tailored to fit
              your lifestyle. Whether you're buying, selling, or renting, our
              expert agents are here to guide you every step of the way.
              Discover your next home with us!
            </h1>
          </div>
          <div className="md:hidden z-0">
            <img
              src="/bg.png"
              alt="bg"
              className="absolute inset-0 bg-cover bg-center opacity-10 mt-20"
            />
          </div>
        </div>
        <div className="w-full relative hidden md:flex z-0">
          <img
            src="/bg.png"
            alt="bg"
            className="absolute inset-0 bg-cover bg-center opacity-80"
          />
        </div>
      </div>
      {/* search bar  */}
      <div className="min-h-60 mt-10 md:mt-16 z-10 w-[90%] mx-auto md:w-full md:mx-0">
        <div className="flex">
          <button
            onClick={() => switchActive("buy")}
            className={`p-4 border-2 border-black rounded-bl-none rounded-br-none rounded-tr-none border-b-0 border-r-2 w-24 rounded-md font-serif font-semibold text-xl z-10 ${
              query.type === "buy"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => switchActive("rent")}
            className={`p-4 border-2 border-black rounded-bl-none rounded-br-none rounded-tl-none border-b-0 border-l-0 w-24 rounded-md font-serif font-semibold text-xl z-10 ${
              query.type === "rent"
                ? "bg-black text-white"
                : "bg-white text-black"
            } `}
          >
            Rent
          </button>
        </div>
        <form className="flex flex-col md:flex-row  md:w-[55.7rem] border-2 border-black font-sans rounded-md rounded-tl-none   ">
          <input
            type="text"
            name="city"
            placeholder="City Location"
            className="p-4 text-xl  outline-none inline z-10 "
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            className="p-4 text-xl  outline-none inline z-10 "
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            className="p-4 text-xl  outline-none inline z-10 "
            onChange={handleChange}
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
            className="p-4 items-center bg-yellow-300 overflow-hidden z-10 w-full"
          >
            <button>
              <FaSearch />
            </button>
          </Link>
        </form>

        <div className="flex mt-10  justify-between items-center p-4 w-full md:w-[55.7rem] ">
          <div>
            <h1 className="font-bold text-3xl font-serif mb-1">16+</h1>
            <h1 className="font-serif text-xl opacity-50">
              Years of Experience
            </h1>
          </div>
          <div>
            <h1 className="font-bold text-3xl font-serif mb-1">200</h1>
            <h1 className="font-serif text-xl opacity-50">Awards Gained</h1>
          </div>
          <div>
            <h1 className="font-bold text-3xl font-serif mb-1">1200+</h1>
            <h1 className="font-serif text-xl opacity-50">Property Ready</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
