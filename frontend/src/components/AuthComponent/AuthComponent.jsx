import React from "react";
import { Outlet } from "react-router-dom";
import authBg from "../../assets/user.jpg";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0F1717]">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${authBg})` }}
      />

      {/* OVERLAY (LIGHT DARK) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;
