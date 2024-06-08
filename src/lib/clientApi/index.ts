import { IdeaType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import { IUser } from "@/types/user.types";
import { NextResponse } from "next/server";

export const getUserFromDb = async (email: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/${email}`, {
      method: "GET",
    });
    if (!response) {
      return;
    }

    return response.json();
  } catch (err) {}
};

export const subtractUserTokens = async (user: IUser, tokens: number) => {
  if (!user || user.tokens < tokens) {
    throw new Error("Not enough tokens");
    return;
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usetokens`, {
      method: "PUT",
      body: JSON.stringify({ email: user.email, tokens }),
    });

    if (!response) {
      return;
    }

    return NextResponse.json({ message: "Successfully used tokens" });
  } catch (err) {}
};

export const getUserTransactions = async (email: string) => {
  try {
    const response = await fetch(`/api/transactions/${email}`, {
      method: "GET",
    });

    if (!response) {
      return;
    }

    return response.json();
  } catch (err) {}
};

export const getUserSavedIdeas = async (email: string, platform: TypeOfContentToGenerate) => {
  try {
    const response = await fetch(`/api/get-saved-ideas/${email}/${platform}`, {
      method: "GET",
    });

    if (!response) {
      return;
    }

    return response.json();
  } catch (err) {}
};

export const handleSaveIdea = async (idea: IdeaType, email: string) => {
  try {
    const response = await fetch(`/api/save-idea`, {
      method: "POST",
      body: JSON.stringify({ idea, email }),
    });

    if (!response) {
      return;
    }

    return response.json();
  } catch (err) {}
};
