import { IdeaType } from "@/types/idea.types";
import React, { useState } from "react";
import heartEmpty from "@/assets/icons/heart-empty.png";
import heartFilled from "@/assets/icons/heart-filled.png";
import Image from "next/image";
import { Button } from "../ui/button";

interface GeneratedIdeaProps {
  idea: IdeaType;
}

const GeneratedIdea = ({ idea }: GeneratedIdeaProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div className="border-2 border-gray-400 rounded-xl p-5 ">
      <Image
        src={isLiked ? heartFilled : heartEmpty}
        alt="heart icon"
        width={25}
        height={25}
        priority
        className="object-fit cursor-pointer mb-2 ml-auto"
        onClick={() => setIsLiked((prev) => !prev)}
      />
      <h2 className="font-semibold">Idea:</h2>
      <h2 className="mb-3">{idea.idea}</h2>
      <h2 className="font-semibold">Short description:</h2>
      <p className="mb-3">{idea.shortDescription}</p>
      <h2 className="font-semibold">Estimated virality score:</h2>
      <p className="mb-3">{idea.viralityScore}</p>
      {idea.script && (
        <>
          <h2 className="font-semibold">Script:</h2>
          <p className="mb-3">{idea.script}</p>
        </>
      )}
      <div className="flex items-center justify-end">
        <Button className="bg-gray-500">
          {idea.script ? "Regenerate script" : "Generate script"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratedIdea;
