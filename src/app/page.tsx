"use client";

import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Platforms from "@/components/sections/Platforms";
import Pricing from "@/components/sections/Pricing";
import Special from "@/components/sections/Special";
import SignInDialog from "@/components/shared/SignInDialog";
import { useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-70px)] w-full  ">
      <Hero setIsLoginOpen={setIsLoginOpen} />
      <Special />
      <Pricing />
      <Platforms />
      <HowItWorks />
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </div>
  );
}
