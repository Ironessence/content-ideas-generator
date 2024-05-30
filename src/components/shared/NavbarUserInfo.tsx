"use client";
import buyCoins from "@/assets/icons/buy-coins.png";
import token from "@/assets/icons/icon-coin.png";
import { useUserContext } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { Button } from "../ui/button";
import AvatarComponent from "./AvatarComponent";

const NavbarUserInfo = () => {
  const { user } = useUserContext();
  const { handleOpenModal } = useDataContext();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={"outline"}
        className="bg-transparent border-slate-400 flex items-center justify-center gap-1 hover:bg-pink-500 hover:text-white hover:border-white"
        onClick={() => handleOpenModal("Purchase")}
      >
        <Image
          src={buyCoins}
          alt="purchase-coins"
          width={25}
          height={25}
        />

        <h2 className="hidden sm:flex">Buy tokens</h2>
      </Button>

      {user && (
        <div className="flex items-center justify-center gap-1 bg-slate-800 py-1 px-2 rounded-xl">
          <h3 className="font-bold text-[18px]">{user.tokens}</h3>
          <Image
            src={token}
            alt="tokens"
            width={25}
            height={25}
          />
        </div>
      )}
      <AvatarComponent />
    </div>
  );
};

export default NavbarUserInfo;
