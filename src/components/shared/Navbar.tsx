"use client";
import React from "react";
import AvatarComponent from "./AvatarComponent";
import { useRouter } from "next/navigation";
import NavbarUserInfo from "./NavbarUserInfo";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="h-[70px] w-full flex px-6 pt-5 align-center justify-between">
      <div
        className="h-auto w-auto cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h2 className={`font-sans text-2xl font-extrabold tracking-widest text-white`}>IdeaFizz</h2>
      </div>
      <div className="h-auto w-auto">
        <NavbarUserInfo />
      </div>
    </div>
  );
};

export default Navbar;
