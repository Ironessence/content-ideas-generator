import { IUser } from "@/types/user.types";
import { NextResponse } from "next/server";

export const getUserFromDb = async (email: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/${email}`, {
      method: "GET",
    });
    if (!response) {
      console.log("getUserFromDb - error while getting user from DB");
      return;
    }

    return response.json();
  } catch (err) {
    console.log("getUserFromDb - catch error", err);
  }
};

export const subtractUserTokens = async (user: IUser, tokens: number) => {
  if (!user || user.tokens < tokens) {
    throw new Error("Not enough tokens");
    return;
  }
  try {
    console.log("THIS RUNS ?");
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usetokens`, {
      method: "PUT",
      body: JSON.stringify({ email: user.email, tokens }),
    });

    if (!response) {
      console.log("useTokens - error while updating user tokens");
      return;
    }

    console.log("ALL good in subtractUserTokens");
    console.log("RESPONSE:", response);
    return NextResponse.json({ message: "Successfully used tokens" });
  } catch (err) {
    console.log("useTokens - catch error", err);
  }
};
