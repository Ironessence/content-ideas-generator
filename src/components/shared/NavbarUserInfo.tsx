import React from "react";
import AvatarComponent from "./AvatarComponent";
import Image from "next/image";
import buyCoins from "@/assets/icons/buy-coins.png";
import Link from "next/link";
import token from "@/assets/icons/icon-coin.png";
import add from "@/assets/icons/add.png";

const NavbarUserInfo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link href="/buy-tokens">
        <div className="relative mr-5 group">
          <Image
            src={buyCoins}
            alt="purchase-coins"
            width={30}
            height={30}
          />
          <Image
            src={add}
            alt="purchase-coins"
            width={30}
            height={30}
            className="absolute top-0 right-[-22px] group-hover:scale-110 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex items-center justify-center gap-1 bg-slate-800 py-1 px-2 rounded-xl">
        <h3 className="font-bold text-[18px]">100</h3>
        <Image
          src={token}
          alt="tokens"
          width={25}
          height={25}
        />
      </div>
      <AvatarComponent />
    </div>
  );
};

export default NavbarUserInfo;
