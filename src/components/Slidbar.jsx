import React from "react";

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <>
      <div className="hidden xl:flex fixed top-0 left-0 w-[100px] h-full bg-[#373B53] rounded-r-2xl flex-col items-center">
        <img src="https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon1_yrdmfo.png" alt="" />
        <img
          src={darkMode ? "https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon4_lmgoko.png" : "https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon2_xpls5g.png"}
          alt=""
          className="mt-auto mb-4 w-[40px] h-[40px] cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        />
        <div className="p-[20px]">
          <img src="https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon3_kmizao.png" alt="" className="w-[50px] h-[50px]" />
        </div>
      </div>

      <div className="xl:hidden fixed top-0 left-0 w-full bg-[#373B53] flex items-center justify-between ">
        <img src="https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon1_yrdmfo.png" alt="" />
        <div className="flex items-center space-x-4">
          <img
            src={darkMode ? "https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon4_lmgoko.png" : "https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon2_xpls5g.png"}
            alt=""
            className="w-[40px] h-[40px] cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />
          <img src="https://res.cloudinary.com/dyuabsnoo/image/upload/v1745659062/icon3_kmizao.png" alt="" className="w-[50px] h-[50px]" />
        </div>
      </div>
    </>
  );
}
