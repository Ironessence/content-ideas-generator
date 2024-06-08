"use client";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center justify-center group cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src={logo}
        alt="logo"
        width={45}
        height={25}
        className="group-hover:rotate-[10deg] transition-all duration-500 ease-in-out"
      />
      <h2
        className={`font-sans text-2xl font-extrabold tracking-wider text-white drop-shadow-lg hidden sm:block`}
      >
        HashtagFast
      </h2>
    </div>
  );
};

export default Logo;
