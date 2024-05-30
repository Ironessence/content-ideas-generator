"use client";
import { usePathname, useRouter } from "next/navigation";
import NavbarUserInfo from "./NavbarUserInfo";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="h-[70px] w-full flex px-6 pt-5 align-center justify-between">
      <div
        className="h-auto w-auto cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h2 className={`font-sans text-2xl font-extrabold tracking-widest text-white`}>
          HashtagFast
        </h2>
      </div>
      {pathname !== "/" && (
        <div className="h-auto w-auto">
          <NavbarUserInfo />
        </div>
      )}
    </div>
  );
};

export default Navbar;
