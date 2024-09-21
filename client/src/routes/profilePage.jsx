import React, { Suspense, useContext, useState } from "react";
import Card from "../components/Card.jsx";
import { FaEdit, FaPlus } from "react-icons/fa";
import List from "../components/List.jsx";
import Chat from "../components/Chat.jsx";
import apiRequest from "../lib/apiRequest.js";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const profilePage = () => {
  const data = useLoaderData();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest.post("/auth/logout");
      // console.log(response);
      setMessage(response.data.message);
      setTimeout(() => {
        updateUser(null);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error logging out: ", error);
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="md:flex w-full mt-6">
      {/* list container  */}
      <div className=" md:w-4/6 p-2 md:p-4 ">
        <div className="mb-4">
          <div className="flex flex-row justify-between font-serif items-center p-2">
            <h1 className="font-semibold text-2xl md:text-3xl">
              User Information
            </h1>
            <Link to={"/profile/update"}>
              <button className="bg-yellow-300 py-2 px-3 text-black rounded-md flex gap-2 items-center">
                <FaEdit /> Update Profile
              </button>
            </Link>
          </div>
          <div className="font-serif p-2 flex flex-col gap-4 my-4">
            <div className="flex gap-2 items-center">
              <b>Avatar:</b>
              <img
                src={currentUser.avatar || "/noavatar.jpg"}
                alt="pfp"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex gap-2 items-center">
              <b>Username:</b>
              <h1>{currentUser.username}</h1>
            </div>
            <div className="flex gap-2 items-center">
              <b>E-mail Id:</b>
              <h1>{currentUser.email}</h1>
            </div>
            <div>
              <button
                className="bg-red-500 p-3 rounded-lg font-semibold w-22 hover:bg-red-400 text-lg shadow-lg"
                onClick={handleLogout}
                disabled={isLoading}
              >
                Logout
              </button>
            </div>
            <div>
              {message && (
                <p className="text-xl font-semibold font-serif my-4 text-red-500 mx-auto text-center">
                  {message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between font-serif items-center p-2">
            <h1 className="font-semibold text-2xl md:text-3xl">Your Posts:</h1>
            <Link to={"/add"}>
              <button className="bg-yellow-300 py-2 px-3 text-black rounded-md flex gap-2 items-center">
                <FaPlus /> Add New Post
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:p-2  ">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
        </div>
        <div className="mt-6 flex flex-col gap-4 md:p-2  ">
          <h1 className="font-semibold text-2xl md:text-3xl font-serif">
            Saved Posts:
          </h1>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      {/* map container  */}
      <div className=" md:w-2/6 w-full h-full">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.chatResponse}
            errorElement={<p>Error loading chats!</p>}
          >
            {(chatResponse) => <Chat chats={chatResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default profilePage;
