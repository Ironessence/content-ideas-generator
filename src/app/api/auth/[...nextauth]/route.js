import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

const handler = NextAuth({
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // The user is written in the database directly after login here >
    async signIn({ user }) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users`, {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            tokens: 150,
            image: user.image,
            transactions: [],
            savedIdeas: [],
          }),
        });
        if (!response) {
          console.log("writeUserInDb - error while writing user in DB");
          return;
        }

        return new NextResponse(response, { status: 200 });
      } catch (err) {
        console.log("writeUserInDb - catch error", err);
      }
    },
  },
});

export { handler as GET, handler as POST };
