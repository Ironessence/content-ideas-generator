"use client";
import logo from "@/assets/logo/logo.png";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import NavbarUserInfo from "./NavbarUserInfo";
import SignInDialog from "./SignInDialog";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useUserContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="h-[70px] w-full flex px-6 pt-5 align-center justify-between">
      <div
        className="h-auto w-auto cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={45}
            height={25}
          />
          <h2 className={`font-sans text-2xl font-extrabold tracking-wider text-white`}>
            HashtagFast
          </h2>
        </div>
      </div>
      {pathname !== "/" && !isLoading && (
        <div className="h-auto w-auto">
          <NavbarUserInfo />
        </div>
      )}
      {pathname === "/" && !isLoading && (
        <Button
          variant={"outline"}
          className="bg-transparent hover:bg-pink-500 hover:text-white hover:border-white"
          onClick={user ? () => router.push("/generate") : () => setIsLoginOpen(true)}
        >
          {user ? "Dashboard" : "Login"}
        </Button>
      )}
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </div>
  );
};

export default Navbar;
