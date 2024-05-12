enum InstagramFormatEnum {
  REEL = "Reel",
  POST = "Post",
  STORY = "Story",
}

enum YoutubeFormatEnum {
  VIDEO = "Video",
  SHORTS = "Shorts",
}

enum LanguageEnum {
  ENGLISH = "English",
}

enum ToneEnum {
  FORMAL = "Formal",
  EDUCATIONAL = "Educational",
  FRIENDLY = "Friendly",
  FUNNY = "Funny",
  SERIOUS = "Serious",
  AMAZED = "Amazed",
}

enum InstagramLengthEnum {
  SHORT = "Short - 0-15 seconds",
  MEDIUM = "Medium - 15-45 seconds",
  LONG = "Long - 45-60 seconds",
}

enum YoutubeShortsLengthEnum {
  SHORT = "Short - 0-15 seconds",
  MEDIUM = "Medium - 15-45 seconds",
  LONG = "Long - 45-60 seconds",
}

enum YoutubeVideoLengthEnum {
  SHORT = "Short - 0-2 minutes",
  MEDIUM = "Medium - 2-10 minutes",
  LONG = "Long - 10+ minutes",
}

type InstagramGenerationDataType = {
  platform: "Instagram";
  format: InstagramFormatEnum;
  niche: string;
  language: LanguageEnum;
  tone: ToneEnum;
  length: InstagramLengthEnum;
  keywords: string;
};

type YoutubeGenerationDataType = {
  platform: "YouTube";
  format: YoutubeFormatEnum;
  niche: string;
  language: LanguageEnum;
  tone: ToneEnum;
  length: YoutubeShortsLengthEnum | YoutubeVideoLengthEnum;
  keywords: string;
};

type GenerationDataType = InstagramGenerationDataType | YoutubeGenerationDataType;

export {
  InstagramFormatEnum,
  YoutubeFormatEnum,
  LanguageEnum,
  ToneEnum,
  InstagramLengthEnum,
  YoutubeShortsLengthEnum,
  YoutubeVideoLengthEnum,
};

export type { InstagramGenerationDataType, YoutubeGenerationDataType, GenerationDataType };
