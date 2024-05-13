import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ChoiceCardProps {
  image: string;
  title: string;
  onSelect: (choice: any) => void;
  form: UseFormReturn<any>;
}

const ChoiceCard = ({ image, title, onSelect, form }: ChoiceCardProps) => {
  return (
    <div
      key={title}
      className={`flex flex-col h-[100px] w-[100px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch("platform") === title ? "bg-slate-600" : ""}`}
      onClick={() => onSelect(title)}
    >
      <Image
        src={image}
        alt="instagram"
        priority
        width={60}
        height={60}
        className="w-[60px] h-[60px] aspect-square self-top mx-auto mt-3"
      />
      <span className="text-white text-center text-[14px] font-semibold">{title}</span>
    </div>
  );
};

export default ChoiceCard;
