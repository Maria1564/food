import Navbar from "layout/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Content;
