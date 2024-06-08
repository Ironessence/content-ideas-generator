"use client";
import { useUserContext } from "@/context/AuthContext";
import useWindowSize from "@/utils/useWindowSize";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import NavbarUserInfo from "./NavbarUserInfo";
import SheetSide from "./SheetSide";
import SignInDialog from "./SignInDialog";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useUserContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const size = useWindowSize();
  return (
    <div className="h-[70px] w-full flex px-6 pt-5 align-center justify-between ">
      <div className="h-auto w-auto ">
        <Logo />
      </div>
      {pathname !== "/" && !isLoading && (
        <div className="h-auto w-auto">
          <NavbarUserInfo />
        </div>
      )}
      {pathname === "/" && !isLoading && (
        <Button
          variant={"outline"}
          className="bg-transparent hover:bg-purple-500 hover:text-white hover:border-white"
          onClick={user ? () => router.push("/generate") : () => setIsLoginOpen(true)}
        >
          {user ? "Dashboard" : "Login"}
        </Button>
      )}
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
      <SheetSide
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
};

export default Navbar;
