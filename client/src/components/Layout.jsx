// components/Layout.js
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-[100%] mx-auto lg:w-[80%]">
      <Navbar />
      <Outlet /> {/* This will render the matching route */}
      <Footer />
    </div>
  );
}

export default Layout;
