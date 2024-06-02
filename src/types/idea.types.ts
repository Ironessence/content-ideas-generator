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
  _id: number;
  createdAt: Date;
  idea: string;
  shortDescription: string;
  isSaved?: boolean;
  script?: ScriptType[];
};
