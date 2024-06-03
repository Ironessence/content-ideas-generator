"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full py-10">
        {/* LOGO */}
        <div className="flex-1 flex w-full items-center justify-center ">
          <h1 className="font-bold text-[26px]">HashtagFast</h1>
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
      <div className="flex items-center w-full justify-center pb-5">
        <h4 className="text-slate-400 text-[14px]">©2024 - HashtagFast. All rights reserved.</h4>
      </div>
    </div>
  );
};

export default Footer;
