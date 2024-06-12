import arrow from "@/assets/icons/right-arrow.png";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TrustedBy from "../shared/TrustedBy";
import { Button } from "../ui/button";
import { Spotlight } from "../ui/spotlight";

const Hero = () => {
  const { user, setIsDialogOpen } = useUserContext();
  const router = useRouter();
  return (
    <div className="flex w-[95%] mr-auto ml-auto flex-col sm:flex-row my-[5vh] sm:my-[10vh] min-h-[55vh]">
      <Spotlight
        className="-top-40 left-0 lg:left-[35vw] lg:-top-20"
        fill="white"
      />

      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col items-center gap-5 relative">
        <h1 className="text-[36px] md:text-[54px] font-extrabold  text-white drop-shadow-lg text-center ">
          🎯Create{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
            Quality
          </span>{" "}
          Social Media Content in{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 px-3 rounded-md">
            Minutes
          </span>
        </h1>
        <h1 className="text-[24px] md:text-[40px] font-extrabold  text-white drop-shadow-lg text-center ">
          and{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            grow your audience
          </span>{" "}
          using our{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            trained AI Model
          </span>
        </h1>

        <Button
          className="my-6 flex items-center gap-1 hover:gap-2 transition-all duration-200 bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-pink-500 border-[1px] border-blue-300"
          onClick={() => {
            if (!user) {
              setIsDialogOpen(true);
            } else {
              router.push("/generate");
            }
          }}
        >
          🚀 Try it out
          <Image
            src={arrow}
            alt="arrow"
            width={20}
            height={20}
          />
        </Button>

        <TrustedBy />
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default Hero;
