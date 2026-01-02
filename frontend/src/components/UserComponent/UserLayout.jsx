import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../UserComponent/UserNavbar";
import Footer from "../UserComponent/UserFooter";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1717]">
      
      {/* TOP NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default UserLayout;
