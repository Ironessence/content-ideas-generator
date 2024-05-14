import { IdeaType } from "@/types/idea.types";
import React from "react";

interface GeneratedIdeaProps {
  idea: IdeaType;
}

const GeneratedIdea = ({ idea }: GeneratedIdeaProps) => {
  return (
    <div className="border-2 border-gray-600 rounded-xl p-10">
      <h2>{idea.idea}</h2>
      <p>{idea.shortDescription}</p>
      <p>{idea.viralityScore}</p>
    </div>
  );
};

export default GeneratedIdea;
