export type DataType = {
  ideas: IdeaType[];
};

export type IdeaType = {
  id: number;
  idea: string;
  viralityScore: number;
  shortDescription: string;
};
