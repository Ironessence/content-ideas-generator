import insta from "@/assets/icons/icon-insta-reel.png";
import instaPost from "@/assets/icons/icon-instagram-post.png";
import linkedin from "@/assets/icons/icon-linkedin.png";
import tiktok from "@/assets/icons/icon-tiktok.png";
import twitter from "@/assets/icons/icon-twitter.png";
import yt from "@/assets/icons/icon-youtube.png";
import Image from "next/image";

const Platforms = () => {
  return (
    <div className="w-[95%] mr-auto ml-auto mb-[20vh]">
      <h1 className="text-center sm:text-[56px] md:text-[40px] font-extrabold text-[40px]">
        Level up your{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 px-3 rounded-md">
          Content Creation
        </span>{" "}
        game
      </h1>
      <div className="bg-slate-600 w-[60%] h-[1px] mr-auto ml-auto my-4" />
      <h1 className="text-center sm:text-[24px] md:text-[24px] font-normal text-[18px] my-10">
        We are continuously training our AI Model to create{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
          high quality content
        </span>{" "}
        for different platforms.{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
          Virality, engagement and reach
        </span>{" "}
        are our top priorities.
      </h1>
      <div className="flex flex-wrap items-start gap-3 justify-center">
        <div className="flex flex-col items-center justify-start gap-2 p-5 border-[2px] border-white rounded-2xl bg-gradient-to-br from-pink-500 to-yellow-500 py-7 min-w-[180px]">
          <Image
            src={insta}
            alt="instagram"
            width={50}
            height={50}
          />
          <h1>Instagram Reels</h1>
        </div>
        <div className="flex flex-col items-center justify-start gap-2 p-5 border-[2px] border-white rounded-2xl bg-gradient-to-br from-red-700 via-black to-blue-400 py-7 min-w-[180px]">
          <Image
            src={tiktok}
            alt="tiktok"
            width={50}
            height={50}
          />
          <h1>TikTok Videos</h1>
        </div>
        <div className="flex flex-col items-center justify-start gap-2  border-[2px] border-white rounded-2xl bg-gradient-to-br from-slate-400 to-slate-800 pb-6 min-w-[180px]">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-full rounded-t-xl flex items-center justify-center">
            <h1 className="font-normal">Training model</h1>
          </div>
          <Image
            src={instaPost}
            alt="instagram post"
            width={50}
            height={50}
          />
          <h1>Instagram Posts</h1>
        </div>
        <div className="flex flex-col items-center justify-start gap-2  border-[2px] border-white rounded-2xl bg-gradient-to-br from-slate-400 to-slate-800 pb-6 min-w-[180px]">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-full rounded-t-xl flex items-center justify-center">
            <h1 className="font-normal">Training model</h1>
          </div>
          <Image
            src={yt}
            alt="youtube"
            width={50}
            height={50}
          />
          <h1>Youtube Shorts</h1>
        </div>
        <div className="flex flex-col items-center justify-start gap-2  border-[2px] border-white rounded-2xl bg-gradient-to-br from-slate-400 to-slate-800 pb-6 min-w-[180px]">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-full rounded-t-xl flex items-center justify-center">
            <h1 className="font-normal">Coming soon</h1>
          </div>
          <Image
            src={linkedin}
            alt="linkedin"
            width={50}
            height={50}
          />
          <h1>LinkedIn Posts</h1>
        </div>
        <div className="flex flex-col items-center justify-start gap-2  border-[2px] border-white rounded-2xl bg-gradient-to-br from-slate-400 to-slate-800 pb-6 min-w-[180px]">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-full rounded-t-xl flex items-center justify-center">
            <h1 className="font-normal">Coming soon</h1>
          </div>
          <Image
            src={twitter}
            alt="twitter"
            width={50}
            height={50}
          />
          <h1>X Posts</h1>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
