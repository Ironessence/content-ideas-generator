"use client";

import Hero from "@/components/sections/Hero";
import SignInDialog from "@/components/shared/SignInDialog";
import { useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-70px)] w-full ">
      <Hero setIsLoginOpen={setIsLoginOpen} />
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </div>
  );
}
