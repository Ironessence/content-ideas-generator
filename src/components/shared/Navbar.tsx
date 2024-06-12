"use client";
import { useUserContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import NavbarUserInfo from "./NavbarUserInfo";
import SheetSide from "./SheetSide";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, setIsDialogOpen } = useUserContext();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    console.log("ISLOADING:", isLoading);
  }, [isLoading]);

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
          onClick={user ? () => router.push("/generate") : () => setIsDialogOpen(true)}
        >
          {user ? "Dashboard" : "Login"}
        </Button>
      )}
      <SheetSide
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
};

export default Navbar;
