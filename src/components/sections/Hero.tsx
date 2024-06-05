import checkmark from "@/assets/icons/checkmark.png";
import arrow from "@/assets/icons/right-arrow.png";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TrustedBy from "../shared/TrustedBy";
import { Button } from "../ui/button";

interface HeroProps {
  setIsLoginOpen: (value: boolean) => void;
}

const Hero = ({ setIsLoginOpen }: HeroProps) => {
  const { user } = useUserContext();
  const router = useRouter();
  return (
    <div className="flex w-[95%] mr-auto ml-auto flex-col sm:flex-row my-[5vh] sm:my-[10vh]">
      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col items-center gap-5 relative">
        <h1 className="text-[56px] font-extrabold  text-white drop-shadow-lg text-center ">
          🎯Create{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Quality
          </span>{" "}
          Social Media Content in{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 px-3 rounded-md">
            Minutes
          </span>
        </h1>

        <div className="flex flex-col gap-2 ">
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
          <div className="flex items-center  gap-1">
            <Image
              src={checkmark}
              alt="checkmark"
              width={20}
              height={20}
              priority
            />
            <h3 className="mix-blend">Saves hours of your time</h3>
          </div>
          <div className="flex items-center  gap-1">
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

        <TrustedBy />
      </div>
    </div>
  );
};

export default Hero;
