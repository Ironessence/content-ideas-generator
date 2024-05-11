"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/AuthContext";

const AvatarComponent = () => {
  const { user } = useUserContext();

  if (!user) return null;
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src={user ? user.image : "/assets/icons/avatar-no-user.png"}
        alt="@shadcn"
      />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
