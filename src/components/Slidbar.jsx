import React from "react";

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <>
      <div className="hidden xl:flex fixed top-0 left-0 w-[100px] h-full bg-[#373B53] rounded-r-2xl flex-col items-center">
        <img src="/assets/icon1.png" alt="" />
        <img
          src={darkMode ? "/assets/icon4.png" : "/assets/icon2.png"}
          alt=""
          className="mt-auto mb-4 w-[40px] h-[40px] cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        />
        <div className="p-[20px]">
          <img src="/assets/icon3.png" alt="" className="w-[50px] h-[50px]" />
        </div>
      </div>

      <div className="xl:hidden fixed top-0 left-0 w-full bg-[#373B53] flex items-center justify-between ">
        <img src="/assets/icon1.png" alt="" />
        <div className="flex items-center space-x-4">
          <img
            src={darkMode ? "/assets/icon4.png" : "/assets/icon2.png"}
            alt=""
            className="w-[40px] h-[40px] cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />
          <img src="/assets/icon3.png" alt="" className="w-[50px] h-[50px]" />
        </div>
      </div>
    </>
  );
}
