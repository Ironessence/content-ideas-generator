import Image from "next/image";
import React from "react";
import img1 from "@/assets/usedBy/examplePeople1.jpg";
import img2 from "@/assets/usedBy/examplePeople2.jpg";
import img3 from "@/assets/usedBy/examplePeople3.jpg";
import img4 from "@/assets/usedBy/examplePeople4.jpg";
import img5 from "@/assets/usedBy/examplePeople5.jpg";
import star from "@/assets/icons/star.png";

const TrustedBy = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex">
        <div className="rounded-[50%] p-[2px] bg-slate-50 flex">
          <Image
            src={img1}
            alt="test"
            width={40}
            height={40}
            priority
            className="rounded-[50%]"
          />
        </div>

        <div className="rounded-[50%] p-[3px] bg-slate-50 ml-[-25px] flex ">
          <Image
            src={img3}
            alt="test"
            width={40}
            height={40}
            priority
            className="rounded-[50%]"
          />
        </div>
        <div className="rounded-[50%] p-[3px] bg-slate-50 ml-[-25px] flex ">
          <Image
            src={img4}
            alt="test"
            width={40}
            height={40}
            priority
            className="rounded-[50%]"
          />
        </div>
        <div className="rounded-[50%] p-[3px] bg-slate-50 ml-[-25px] flex ">
          <Image
            src={img5}
            alt="test"
            width={40}
            height={40}
            priority
            className="rounded-[50%]"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-0">
          <Image
            src={star}
            alt="star"
            width={20}
            height={20}
            priority
          />
          <Image
            src={star}
            alt="star"
            width={20}
            height={20}
            priority
          />

          <Image
            src={star}
            alt="star"
            width={20}
            height={20}
            priority
          />
          <Image
            src={star}
            alt="star"
            width={20}
            height={20}
            priority
          />
          <Image
            src={star}
            alt="star"
            width={20}
            height={20}
            priority
          />
        </div>
        <h1 className="whitespace-nowrap font-semibold">
          <span className="font-bold">Trusted</span> by hundreds of content creators
        </h1>
      </div>
    </div>
  );
};

export default TrustedBy;
