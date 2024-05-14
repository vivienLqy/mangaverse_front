import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const index = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-col ">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default index;
