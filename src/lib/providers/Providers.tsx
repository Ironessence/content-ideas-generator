"use client";
import { AuthContextProvider } from "@/context/AuthContext";
import { DataContextProvider } from "@/context/DataContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        <DataContextProvider>{children}</DataContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
