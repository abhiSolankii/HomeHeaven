import React, { useContext, useState } from "react";
import {
  FaBath,
  FaBed,
  FaBookmark,
  FaBus,
  FaDog,
  FaLocationArrow,
  FaMoneyBill,
  FaPizzaSlice,
  FaRegBookmark,
  FaSchool,
  FaSms,
  FaTape,
  FaTools,
} from "react-icons/fa";
import Slider from "../components/Slider";
import Map from "../components/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

const singlePage = () => {
  const post = useLoaderData();
  // console.log(post);
  if (!post) {
    return <div>No post data available.</div>;
  }
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [saved, setSaved] = useState(post.isSaved);

  const singlePostData = {
    id: post.id || 1,
    title: post.title || "No Title Available",
    price: post.price || 0,
    images: post.images.length > 0 ? post.images : ["default-image-url"],
    bedRooms: post.bedroom || 0,
    bathroom: post.bathroom || 0,
    size: post.postDetail.size || 0,
    latitude: parseFloat(post.latitude) || 0,
    longitude: parseFloat(post.longitude) || 0,
    city: post.city || "No City Available",
    address: post.address || "No Address Available",
    school: post.postDetail.school ? `${post.postDetail.school}m away` : "N/A",
    bus: post.postDetail.bus ? `${post.postDetail.bus}m away` : "N/A",
    restaurant: post.postDetail.restaurant
      ? `${post.postDetail.restaurant}m away`
      : "N/A",
    description: post.postDetail.desc || "No Description Available",
    utilities: post.postDetail.utilities || "N/A",
    pet: post.postDetail.pet || "N/A",
    income: post.postDetail.income || "N/A",
  };

  const userData = {
    id: post.user.id || 1,
    name: post.user.username || "Anonymous",
    img: post.user.avatar || "/noavatar.jpg",
  };

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.error("Error in saving post: ", error);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="md:flex">
      {/* left  */}
      <div className="md:w-4/6 space-y-6  p-4">
        <div className="w-full">
          <Slider images={singlePostData.images} />
        </div>
        <div className="flex justify-between">
          <div className=" space-y-4">
            <h1 className="font-serif font-semibold text-3xl">
              {singlePostData.title}
            </h1>
            <h1 className="flex items-center gap-2 opacity-60">
              <FaLocationArrow /> {singlePostData.address}
            </h1>
            <h1 className="flex flex-row gap-2 font-serif p-4 bg-yellow-100 max-w-[10rem] rounded-lg">
              $ {singlePostData.price}
            </h1>
          </div>
          <div className="flex flex-col gap-8 p-8 items-center bg-yellow-100 rounded-lg w-[20rem]">
            <img
              src={userData.img}
              alt="pfp"
              className="rounded-full w-[60px] h-[60px]"
            />
            <h1 className="font-serif font-semibold ">{userData.name}</h1>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(singlePostData.description),
          }}
        ></div>
      </div>
      {/* right */}
      <div className="md:w-2/6 bg-yellow-100 p-4 flex flex-col gap-4 font-serif">
        {/* 1  */}
        <div>
          <h1 className="font-semibold text-xl">General</h1>
          <div className="flex flex-col gap-2  p-2 rounded-lg bg-white">
            <div className="flex flex-col gap-0 p-1">
              <h1 className="flex gap-2 items-center">
                <FaTools />
                Utilities
              </h1>
              <h2 className="text-sm opacity-70 ">
                {singlePostData.utilities}
              </h2>
            </div>
            <div className="flex flex-col gap-0 p-1">
              <h1 className="flex gap-2 items-center">
                <FaDog /> Pet policy
              </h1>
              <h2 className="text-sm opacity-70 ">{singlePostData.pet}</h2>
            </div>
            <div className="flex flex-col gap-0 p-1">
              <h1 className="flex gap-2 items-center">
                <FaMoneyBill /> Property fees
              </h1>
              <h2 className="text-sm opacity-70 ">{singlePostData.income}</h2>
            </div>
          </div>
        </div>
        {/* 2  */}
        <div>
          <h1 className="font-semibold text-xl">Room Sizes</h1>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center  p-1 bg-white">
              <FaTape />
              <h1>
                {singlePostData.size} sqm{" "}
                {singlePostData.size
                  ? `(${(singlePostData.size * 10.764).toFixed(2)} sqft)`
                  : ""}
              </h1>
            </div>
            <div className="flex flex-row gap-2 items-center  p-1 bg-white">
              <FaBed />
              <h1>{singlePostData.bedRooms} bed</h1>
            </div>
            <div className="flex flex-row gap-2 items-center  p-1 bg-white">
              <FaBath />
              <h1>{singlePostData.bathroom} bathroom</h1>
            </div>
          </div>
        </div>
        {/* 3  */}
        <div>
          <h1 className="font-semibold text-xl">Nearby Places</h1>
          <div className=" bg-white p-4 flex flex-row justify-between">
            <div>
              <h1 className="flex gap-2 items-center">
                <FaSchool />
                School
              </h1>
              <h2 className="text-sm opacity-70 ">{singlePostData.school}</h2>
            </div>
            <div>
              <h1 className="flex gap-2 items-center">
                <FaBus /> Bus Stop
              </h1>
              <h2 className="text-sm opacity-70 ">{singlePostData.bus}</h2>
            </div>
            <div>
              <h1 className="flex gap-2 items-center">
                <FaPizzaSlice /> Restaurant
              </h1>
              <h2 className="text-sm opacity-70 ">
                {singlePostData.restaurant}
              </h2>
            </div>
          </div>
        </div>
        {/* 4 */}
        <div>
          <h1 className="font-semibold text-xl">Location</h1>
          <div className="w-full h-[50rem] items-center overflow-scroll">
            <Map items={[singlePostData]} />
          </div>
        </div>
        {/* 5 */}
        <div className="flex justify-between">
          <div className="flex gap-2 bg-white p-4 items-center">
            <FaSms /> Send a Message
          </div>
          <div>
            {saved ? (
              <button
                className="flex gap-2 bg-white p-4 items-center"
                onClick={handleSave}
              >
                <FaBookmark /> Place saved
              </button>
            ) : (
              <button
                className="flex gap-2 bg-white p-4 items-center"
                onClick={handleSave}
              >
                <FaRegBookmark /> Save the Place
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default singlePage;
