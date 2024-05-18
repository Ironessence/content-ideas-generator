export type DataType = {
  ideas: IdeaType[];
};

export type ScriptDataType = {
  script: ScriptType[];
};

export type ScriptType = {
  scene: string;
  visuals: string;
  dialogue: string;
};

export type IdeaType = {
  id: number;
  idea: string;
  viralityScore: number;
  shortDescription: string;
  script?: ScriptDataType;
};
