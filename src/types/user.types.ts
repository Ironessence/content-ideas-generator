import { ObjectId } from "mongodb";

export type IGoogleUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type IUser = {
  _id: ObjectId;
  __v: string;
  name: string;
  email: string;
  diamonds: number;
  image: string;
};
