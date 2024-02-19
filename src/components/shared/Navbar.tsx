import Image from "next/image";
import React from "react";
import AvatarComponent from "./AvatarComponent";

const Navbar = () => {
  return (
    <div className="h-[70px] w-full flex px-5 pt-2 align-center justify-between">
      <div className="h-auto w-auto ">
        <Image
          src={"/assets/logo/ideafizz black.png"}
          width={150}
          height={150}
          alt="logo"
          priority
          objectFit="contain"
        />
      </div>
      <div className="h-auto w-auto">
        <AvatarComponent />
      </div>
    </div>
  );
};

export default Navbar;
