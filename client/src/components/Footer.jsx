import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">HomeHaven</h2>
          <p>
            HomeHaven is your go-to platform for finding your dream home. We
            offer a wide range of listings to suit all your needs.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a href="/agents" className="hover:underline">
                Agents
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">123 Main Street, Anytown, USA</p>
          <p className="mb-2">Email: info@homehaven.com</p>
          <p>Phone: (123) 456-7890</p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:opacity-75">
              <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-75">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 HomeHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
