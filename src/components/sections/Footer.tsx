"use client";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname === "/generate") return null;
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
        {/* LOGO */}
        <div className="flex-1 flex w-full items-center justify-center ">
          <div className="flex items-center justify-center group ">
            <Image
              src={logo}
              alt="logo"
              width={45}
              height={25}
              className="group-hover:rotate-[10deg] transition-all duration-500 ease-in-out"
            />
            <h2
              className={`font-sans text-2xl font-extrabold tracking-wider text-white drop-shadow-lg`}
            >
              HashtagFast
            </h2>
          </div>
        </div>
        {/* OTHERS */}
        <div className="flex-1 flex-col w-full flex gap-5 sm:flex-row sm:items-start ">
          {/* LINKS */}
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-1">
            <h1 className="font-semibold text-[18px]">Links</h1>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
          </div>
          {/* SOCIAL */}
          <div className="flex flex-col items-center justify-center sm:flex-1">
            <h1 className="font-semibold text-[18px]">Social</h1>
            <Link href="/terms">Instagram</Link>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full justify-center pt-10 pb-5">
        <h4 className="text-slate-400 text-[14px]">©2024 - HashtagFast. All rights reserved.</h4>
      </div>
    </div>
  );
};

export default Footer;
