"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import arrow from "@/assets/icons/arrow-down.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const AvatarComponent = () => {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-1 cursor-pointer relative">
          <Avatar>
            <AvatarImage
              src={user ? user.image : "/assets/icons/avatar-no-user.png"}
              alt="@shadcn"
            />

            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <Image
            src={arrow}
            alt="arrow"
            width={20}
            height={20}
            className={`transform ${isOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuItem className="cursor-pointer">Saved Ideas</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Transaction History</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-800 font-semibold cursor-pointer "
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
