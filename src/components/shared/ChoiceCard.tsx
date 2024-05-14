import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ChoiceCardProps {
  image?: string;
  title: string | number;
  onSelect: (choice: any) => void;
  form: UseFormReturn<any>;
  formFieldName: string;
}

const ChoiceCard = ({ image, title, onSelect, form, formFieldName }: ChoiceCardProps) => {
  return (
    <div
      key={title}
      className={`flex flex-col h-[85px] w-[85px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch(formFieldName) === title || form.watch("contentType") === title ? "bg-slate-600" : ""} ${image == null && "items-center justify-center"}`}
      onClick={() => onSelect(title)}
    >
      {image && (
        <Image
          src={image}
          alt="instagram"
          priority
          width={40}
          height={40}
          className="w-[40px] h-[40px] aspect-square self-top mx-auto mt-3 mb-1"
        />
      )}
      <span
        className={
          image == null
            ? "text-white text-center text-[24px] font-bold"
            : "text-white text-center text-[13px] font-semibold"
        }
      >
        {typeof title === "number" ? String(title) : title}
      </span>
    </div>
  );
};

export default ChoiceCard;
