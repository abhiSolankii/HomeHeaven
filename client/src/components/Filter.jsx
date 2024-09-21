import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: [e.target.value],
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };
  return (
    <div>
      <div>
        <h1 className="font-serif opacity-60 text-3xl">
          Search results for <b>{searchParams.get("city")}</b>
        </h1>
      </div>
      <div className="my-4">
        <TextField
          label="City Location"
          variant="outlined"
          className="w-full opacity-70"
          name="city"
          id="city"
          onChange={handleChange}
          defaultValue={query.city}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-row md:flex-col w-full md:w-1/6 gap-2 ">
          <label htmlFor="type" className="mb-2 font-semibold">
            Type
          </label>
          <select
            name="type"
            id="type"
            className="p-2 border border-gray-300 rounded h-[2.6rem] outline-none w-[20rem] md:w-[10rem] "
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-1/6 gap-2">
          <label htmlFor="property" className="mb-2 font-semibold">
            Property
          </label>
          <select
            name="property"
            id="property"
            className="p-2 border border-gray-300 rounded h-[2.6rem] outline-none w-[20rem] md:w-[10rem]"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="any">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-1/6 gap-2 ">
          <label htmlFor="minPrice" className="mb-2 font-semibold">
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            placeholder="Any"
            className="p-2 border border-gray-300 rounded outline-none w-[20rem] md:w-[10rem]"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-1/6 gap-2 ">
          <label htmlFor="maxPrice" className="mb-2 font-semibold">
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            placeholder="Any"
            className="p-2 border border-gray-300 rounded outline-none w-[20rem] md:w-[10rem]"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="flex flex-row md:flex-col w-full md:w-1/6 gap-2 ">
          <label htmlFor="bedroom" className="mb-2 font-semibold">
            Bedroom
          </label>
          <input
            type="number"
            name="bedroom"
            id="bedroom"
            placeholder="Any"
            className="p-2 border border-gray-300 rounded outline-none w-[20rem] md:w-[10rem]"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <div className="flex items-end w-full md:w-1/6">
          <button
            className="p-4 bg-yellow-300 border border-yellow-400 rounded z-10 items-center justify-center "
            onClick={handleFilter}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
