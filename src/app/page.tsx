"use client";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Platforms from "@/components/sections/Platforms";
import Pricing from "@/components/sections/Pricing";
import Special from "@/components/sections/Special";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-70px)] w-full  ">
      <Hero />
      <Special />
      <Pricing />
      <Platforms />
      <HowItWorks />
    </div>
  );
}
