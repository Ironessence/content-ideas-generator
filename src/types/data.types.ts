export type DataType = {
  ideas: IdeaType[];
};

export type IdeaType = {
  id: number;
  hook: string;
  idea: string;
  viralityScore: number;
};
