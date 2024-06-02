"use client";

import { useToast } from "@/components/ui/use-toast";
import { getUserFromDb } from "@/lib/clientApi";
import { IUser } from "@/types/user.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const initialState = {
  user: undefined,
  refreshUser: () => {},
  isLoading: false,
};

type InitialStateType = {
  user?: IUser;
  refreshUser: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<InitialStateType>(initialState);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { toast } = useToast();

  // The function is used to both get the user and also refresh the user data for example for displaying the new tokens
  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    if (session?.user?.email) {
      getUserFromDb(session.user.email)
        .then((res) => setUser(res))
        .catch(() => {
          toast({
            title: "Unable to retrieve user data!",
            description: "Please try again later. If the problem persists, contact support.",
          });
          router.push("/");
        })
        .finally(() => setIsLoading(false));
    }
  }, [router, session?.user?.email, toast]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser, router, session?.user?.email]);

  const value = {
    user,
    refreshUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
