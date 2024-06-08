"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typesOfContentToGenerate } from "@/constants/typesOfContentToGenerate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const TypeOfContentSelect = () => {
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelection = (typeOfContent: string) => {
    const params = new URLSearchParams(searchParams);
    if (typeOfContent) {
      params.set("type", typeOfContent);
    } else {
      params.delete("type");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // Set the default type of content to Instagram Reel
  useEffect(() => {
    if (!contentType) {
      const params = new URLSearchParams(searchParams);
      params.set("type", "Instagram Reel");
      replace(`${pathname}?${params.toString()}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex flex-col items-start">
        <Label className="mb-2">Type of content:</Label>
        <Select
          onValueChange={(value) => handleSelection(value)}
          value={contentType ?? ""}
        >
          <SelectTrigger className="w-[150px] bg-slate-600 text-white focus:text-white border-slate-600">
            <SelectValue placeholder={"Select type of content you want to generate"} />
          </SelectTrigger>
          <SelectContent className="bg-slate-600 text-white focus:text-white selection:text-white border-slate-800 ">
            {typesOfContentToGenerate.map((choice, index) => (
              <div key={choice}>
                <SelectItem
                  value={choice}
                  key={choice}
                  className="bg-slate-600 focus:bg-slate-600 text-white focus:text-white selection:text-white py-3 "
                  disabled={choice !== "Instagram Reel" && choice !== "TikTok Video"}
                >
                  {choice !== "Instagram Reel" && choice !== "TikTok Video"
                    ? `${choice} (Coming soon)`
                    : choice}
                </SelectItem>
                {index !== typesOfContentToGenerate.length - 1 && (
                  <div className="w-[75%] h-[1px] bg-slate-700 ml-auto mr-auto" />
                )}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-[250px] h-[1px] bg-slate-600" />
    </>
  );
};

export default TypeOfContentSelect;
