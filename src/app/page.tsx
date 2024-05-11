"use client";

import { useState } from "react";
import SignInDialog from "@/components/shared/SignInDialog";
import Hero from "@/components/sections/Hero";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="h-full w-full ">
      <Hero setIsLoginOpen={setIsLoginOpen} />
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </div>
  );
}
