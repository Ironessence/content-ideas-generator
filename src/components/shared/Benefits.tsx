import checkmark from "@/assets/icons/checkmark.png";
import Image from "next/image";

const Benefits = () => {
  return (
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
  );
};

export default Benefits;
