import Image from "next/image";
import React from "react";
import heroImg from "@/assets/heroImage.png";
import { Button } from "../ui/button";
import arrow from "@/assets/icons/right-arrow.png";
import checkmark from "@/assets/icons/checkmark.png";
import TrustedBy from "../shared/TrustedBy";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface HeroProps {
  setIsLoginOpen: (value: boolean) => void;
}

const Hero = ({ setIsLoginOpen }: HeroProps) => {
  const { user } = useUserContext();
  const router = useRouter();
  return (
    <div className="h-screen flex my-[5%] px-[150px]">
      <div className="flex-1 flex flex-col items-center gap-5 my-[100px]  ">
        <h1 className="text-[56px] font-extrabold  text-gray-200 drop-shadow-lg">
          Create <span className="text-pink-500">Quality</span> Social Media Content in{" "}
          <span className="bg-pink-500 p-1 px-2">Minutes</span>
        </h1>

        <div className="flex flex-col gap-2 mr-auto">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={checkmark}
              alt="checkmark"
              width={20}
              height={20}
              priority
            />
            <h3>Trained to generate viral ideas & content</h3>
          </div>
          <div className="flex items-center justify-left gap-1">
            <Image
              src={checkmark}
              alt="checkmark"
              width={20}
              height={20}
              priority
            />
            <h3>Saves hours of your time</h3>
          </div>
          <div className="flex items-center justify-left gap-1">
            <Image
              src={checkmark}
              alt="checkmark"
              width={20}
              height={20}
              priority
            />
            <h3>Advanced configurability</h3>
          </div>
        </div>

        <div className="mr-auto mt-5">
          <TrustedBy />
        </div>

        <Button
          className="my-6 flex items-center gap-1 hover:gap-2 transition-all duration-200 bg-pink-500 hover:bg-pink-500"
          onClick={() => {
            if (!user) {
              setIsLoginOpen(true);
            } else {
              router.push("/generate");
            }
          }}
        >
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
