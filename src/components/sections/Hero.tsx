import Image from "next/image";
import React from "react";
import heroImg from "@/assets/heroImage.png";
import { Button } from "../ui/button";
import arrow from "@/assets/icons/right-arrow.png";

const Hero = () => {
  return (
    <div className="h-screen flex my-[5%] px-10">
      <div className="flex-1 flex flex-col items-center gap-5 my-[100px]">
        <h1 className="text-[56px] font-extrabold text-center text-gray-200">
          <span className="font-extrabold text-green-400 drop-shadow-xl">Quality</span> AI-Generated
          Social Media Content
        </h1>
        <h2 className="text-xl font-medium text-center text-gray-200">
          Viral ideas & complete scripts, generated in under{" "}
          <span className="font-extrabold text-green-400 drop-shadow-xl">2 minutes</span>.
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-300">
          with a focus on{" "}
          <span className="font-extrabold text-green-400 drop-shadow-xl">quality, creativity,</span>{" "}
          and <span className="font-extrabold text-green-400 drop-shadow-xl">engagement</span>.
        </h3>
        <Button className="my-6 flex items-center gap-1 hover:gap-2 transition-all duration-200">
          Try it out
          <Image
            src={arrow}
            alt="arrow"
            width={20}
            height={20}
          />
        </Button>
      </div>
      <div className="flex flex-1 justify-center items-start">
        <Image
          src={heroImg}
          priority
          alt="img-test"
          objectFit="contain"
          className="w-[400px]"
        />
      </div>
    </div>
  );
};

export default Hero;
