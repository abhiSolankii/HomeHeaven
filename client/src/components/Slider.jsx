import React from "react";

const Slider = ({ images }) => {
  return (
    <div>
      <div className="w-full hidden md:flex gap-5">
        {/* Big image  */}
        <div className="md:w-3/4">
          <img
            src={images[0]}
            alt=""
            className="w-full h-[200px] md:h-full rounded-lg object-cover cursor-pointer overflow-hidden "
          />
        </div>
        {/* Small images  */}
        <div className="md:w-1/4 h-full flex flex-col gap-5 justify-between ">
          {images.slice(1).map((image, index) => (
            <img
              src={image}
              key={index}
              className="w-full h-[200px] rounded-lg object-cover overflow-hidden cursor-pointer transform transition-transform duration-300 md:hover:scale-150 hover:z-10"
            />
          ))}
        </div>
      </div>
      <div className="md:hidden">
        <div className="w-full h-full flex flex-col gap-5 justify-between p-2 overflow-hidden">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              className="w-full h-[200px] rounded-lg object-cover overflow-hidden cursor-pointer transform transition-transform duration-300 md:hover:scale-150 hover:z-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
