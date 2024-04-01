import Image from "next/image";
import React from "react";
import heroImg from "@/assets/heroImage.png";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="h-screen flex my-[5%]">
      <div className="flex-1 flex flex-col items-center gap-5 my-[100px]">
        <h1 className="text-[56px] font-extrabold text-center text-gray-200">
          AI Generated Social Media Content ideas
        </h1>
        <h2 className="text-xl font-medium text-center text-gray-200">
          Spend between{" "}
          <span className="font-extrabold text-green-400 drop-shadow-xl">2 to 5 minutes</span> to
          generate viral ideas & complete scripts
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-300">
          ...and use the saved time where it truly matters
        </h3>
        <Button className="my-6">Start generating</Button>
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
