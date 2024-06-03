import logo from "@/assets/logo/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={logo}
        alt="logo"
        width={45}
        height={25}
      />
      <h2 className={`font-sans text-2xl font-extrabold tracking-wider text-white`}>HashtagFast</h2>
    </div>
  );
};

export default Logo;
