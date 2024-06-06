import creative from "@/assets/icons/icon-creative.png";
import easy from "@/assets/icons/icon-easy.png";
import saveMoney from "@/assets/icons/icon-save-money.png";
import saveTime from "@/assets/icons/icon-save-time.png";
import secure from "@/assets/icons/icon-secure.png";
import smart from "@/assets/icons/icon-smart.png";
import Image from "next/image";
import { BackgroundGradientAnimation } from "../ui/bg-gradient-animation";

const Special = () => {
  return (
    <div className="w-[95%] ml-auto mr-auto rounded-xl mb-[10vh] ">
      <BackgroundGradientAnimation>
        <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/50 text-center text-[40px] md:text-[56px] font-extrabold my-10">
          What makes{" "}
          <span className="text-white">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
              #
            </span>
            FAST
          </span>{" "}
          so <span className="text-white">✨Special✨?</span>
        </h1>
        <div className="bg-slate-600 w-[60%] h-[1px] mr-auto ml-auto mb-4" />
        <div className="flex items-center justify-center gap-10 px-20 flex-col  flex-1 lg:mt-[10vh] lg:gap-[15vh]">
          {/* ROW 1 */}
          <div className="flex items-start justify-center gap-10 flex-col sm:flex-row">
            <div className="flex flex-1 flex-col items-center justify-start  gap-2 ">
              <Image
                src={smart}
                alt="icon"
                width={50}
                height={50}
              />
              <h1 className="text-[24px] font-bold text-center">Trained for Social Media</h1>
              <h3 className="text-[18px] font-extralight text-center">
                Our AI is trained to provide the best results for social media platforms and take
                into consideration their specific requirements
              </h3>
            </div>
            <div className="flex flex-1 flex-col items-center justify-start gap-2 ">
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
            <div className="flex flex-1 flex-col items-center justify-start gap-2 ">
              <Image
                src={saveTime}
                alt="icon"
                width={50}
                height={50}
              />
              <h1 className="text-[24px] font-bold text-center">Saves precious time</h1>
              <h3 className="text-[18px] font-extralight text-center">
                Focus on creating beautiful videos, not on coming up with ideas and scripts. We got
                you covered
              </h3>
            </div>
          </div>
          {/* ROW 2 */}
          <div className="flex items-start justify-center gap-10 flex-col sm:flex-row">
            <div className="flex flex-1 flex-col items-center justify-start gap-2 ">
              <Image
                src={creative}
                alt="icon"
                width={50}
                height={50}
              />
              <h1 className="text-[24px] font-bold text-center">Highly creative</h1>
              <h3 className="text-[18px] font-extralight text-center">
                Trained to provide stable yet creative results. You&apos;ll never get bored
              </h3>
            </div>
            <div className="flex flex-1 flex-col items-center justify-start gap-2 ">
              <Image
                src={saveMoney}
                alt="icon"
                width={50}
                height={50}
              />
              <h1 className="text-[24px] font-bold text-center">Cost efficient</h1>
              <h3 className="text-[18px] font-extralight text-center">
                We try to be as competitive as possible, so you can focus on creating, not on
                spending
              </h3>
            </div>
            <div className="flex flex-1 flex-col items-center justify-start gap-2 ">
              <Image
                src={secure}
                alt="icon"
                width={50}
                height={50}
              />
              <h1 className="text-[24px] font-bold text-center">Secure</h1>
              <h3 className="text-[18px] font-extralight text-center">
                Your generated ideas and scripts are yours and yours only. We take extra precautions
                to keep them safe
              </h3>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default Special;
