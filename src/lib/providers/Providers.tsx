"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 4 * 1000,
            refetchInterval: 4 * 1000,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
