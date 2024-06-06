import easy from "@/assets/icons/icon-easy.png";
import saveTime from "@/assets/icons/icon-save-time.png";
import smart from "@/assets/icons/icon-smart.png";
import Image from "next/image";
import { BackgroundGradientAnimation } from "../ui/bg-gradient-animation";

const Special = () => {
  return (
    <div className="w-[95%] h-[100vh] ml-auto mr-auto rounded-xl mb-[20vh]">
      <BackgroundGradientAnimation>
        <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/40 text-center text-[56px] font-extrabold my-10">
          What makes it so <span className="text-white">✨Special✨?</span>
        </h1>
        <div className="flex items-center justify-center gap-10 px-20 mt-[25vh]">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 ">
            <Image
              src={smart}
              alt="icon"
              width={50}
              height={50}
            />
            <h1 className="text-[24px] font-bold text-center">Trained for social media</h1>
            <h3 className="text-[18px] font-extralight text-center">
              Always know what you&apos;re up to and when you&apos;re about to do whatever thing
            </h3>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Image
              src={easy}
              alt="icon"
              width={50}
              height={50}
            />
            <h1 className="text-[24px] font-bold text-center">Ease of use</h1>
            <h3 className="text-[18px] font-extralight text-center">
              Specifically designed to be as easy to configure and use as possible
            </h3>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Image
              src={saveTime}
              alt="icon"
              width={50}
              height={50}
            />
            <h1 className="text-[24px] font-bold text-center">Save precious time</h1>
            <h3 className="text-[18px] font-extralight text-center">
              Focus on creating beautiful videos, not on coming up with ideas and scripts. We got
              you covered
            </h3>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default Special;
