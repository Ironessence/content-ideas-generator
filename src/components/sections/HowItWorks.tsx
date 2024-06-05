import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="px-5">
      <h1 className="font-bold text-center text-[36px]">How does it work?</h1>
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-start">
        <div className="flex flex-1 mt-5 sm:mt-0">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold text-[24px] mb-5">1. Generate Ideas & Content</h3>
            <p className="text-center text-slate-400">Example of an output:</p>
            <div className="flex flex-col gap-3 ">
              <p>
                <span className="font-bold">Idea: </span>
                An interactive cooking video responding to comments
              </p>
              <p>
                <span className="font-bold">Short Description: </span>
                Create an interactive cooking video, where the chef responds to comments in
                real-time.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <h3 className="font-bold text-[24px] text-center mb-5">
            2. Put the idea & content in action
          </h3>
          <motion.video
            src={"/assets/video.mp4"}
            autoPlay
            loop
            muted
            className="w-[70%] aspect-[16:9] rounded-xl shadow-lg object-fill mr-auto ml-auto"
            whileInView={{ visibility: "visible", scale: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
