import { PricingOptionsType } from "@/types/pricingOptions.types";

export const constants = {
  ideasPrice: 10,
  scriptPrice: 30,
};

export const pricingOptions: PricingOptionsType[] = [
  {
    id: 1,
    title: "1000 Tokens",
    image: "/assets/images/coins/coins-1.png",
    price: 10,
    aproxIdeas: 150,
  },
  {
    id: 2,
    title: "2500 Tokens",
    bonus: "500 Tokens",
    image: "/assets/images/coins/coins-2.png",
    price: 20,
    mostPopular: true,
    aproxIdeas: 375,
  },
  {
    id: 3,
    title: "4000 Tokens",
    bonus: "1000 Tokens",
    image: "/assets/images/coins/coins-3.png",
    price: 30,
    aproxIdeas: 600,
  },
];

const typesOfContentToGenerate = [
  "Instagram Reel",
  "TikTok Video",
  "Instagram Post",
  "YouTube Short",
  "X (Twitter) Post",
  "LinkedIn Post",
  "Facebook Post",
];

export default typesOfContentToGenerate;
