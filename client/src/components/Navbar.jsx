import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";

import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-2 border-2 shadow-md">
      <nav className="items-center w-full p-4 flex justify-between">
        <div>
          <a
            href="/"
            className="flex items-center hover:opacity-70 transform transition-transform duration-300 hover:scale-110"
          >
            <img src="/logo.jpg" alt="logo" className="w-24" />
            <span className="ml-2 text-lg font-semibold">HomeHaven</span>
          </a>
        </div>
        <div className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="hover:opacity-70 cursor-pointer"
            onClick={toggleNavbar}
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:space-x-6">
          <Link
            to="/"
            className="text-lg hover:opacity-70 transform transition-transform duration-300 hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg hover:opacity-70 transform transition-transform duration-300 hover:scale-110"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg hover:opacity-70 transform transition-transform duration-300 hover:scale-110"
          >
            Contact
          </Link>
          <Link
            to="/agents"
            className="text-lg hover:opacity-70 transform transition-transform duration-300 hover:scale-110"
          >
            Agents
          </Link>
          {currentUser ? (
            <div className="flex flex-row gap-2 items-center  transform transition-transform duration-300 hover:scale-110 hover:opacity-70 cursor-pointer">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/noavatar.jpg"}
                  alt="pfp"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <Link to="/profile" className="font-semibold">
                {currentUser.username}
              </Link>
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <Link to="/login" className="text-lg">
                <Button variant="outlined">Log In</Button>
              </Link>
              <Link to="/register" className="text-lg">
                <Button variant="contained">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-10 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="hover:opacity-70 cursor-pointer mb-4"
            onClick={toggleNavbar}
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>

          <Link to="/home" className="text-lg hover:opacity-70 block mb-4">
            Home
          </Link>
          <Link to="/about" className="text-lg hover:opacity-70 block mb-4">
            About
          </Link>
          <Link to="/contact" className="text-lg hover:opacity-70 block mb-4">
            Contact
          </Link>
          <Link to="/agents" className="text-lg hover:opacity-70 block mb-4">
            Agents
          </Link>
          {currentUser ? (
            <div className="flex flex-row gap-2 items-center  transform transition-transform duration-300 hover:scale-110 hover:opacity-70 cursor-pointer">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/noavatar.jpg"}
                  alt="pfp"
                  className="w-10 h-10 rounded-full"
                />
              </div>

              <h1 className="font-semibold">{currentUser.username}</h1>
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <Link to="/login" className="text-lg">
                <Button variant="outlined">Log In</Button>
              </Link>
              <Link to="/register" className="text-lg">
                <Button variant="contained">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
