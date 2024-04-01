import React from "react";
import AvatarComponent from "./AvatarComponent";
import { kanit } from "@/app/layout";

const Navbar = () => {
  return (
    <div className="h-[70px] w-full flex px-6 pt-5 align-center justify-between">
      <div className="h-auto w-auto ">
        <h2
          className={`${kanit.variable} font-sans text-2xl font-extrabold tracking-widest text-white`}
        >
          IdeaFizz
        </h2>
      </div>
      <div className="h-auto w-auto">
        <AvatarComponent />
      </div>
    </div>
  );
};

export default Navbar;
