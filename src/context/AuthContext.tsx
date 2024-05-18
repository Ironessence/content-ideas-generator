"use client";

import { getUserFromDb } from "@/lib/clientApi";
import { IUser } from "@/types/user.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const initialState = {
  user: undefined,
  refreshUser: () => {},
};

type InitialStateType = {
  user?: IUser;
  refreshUser: () => void;
};

const AuthContext = createContext<InitialStateType>(initialState);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | undefined>();
  const router = useRouter();

  // The function is used to both get the user and also refresh the user data for example for displaying the new tokens
  const refreshUser = useCallback(async () => {
    if (session?.user?.email) {
      getUserFromDb(session.user.email)
        .then((res) => setUser(res))
        .catch((err) => {
          console.log("unable to correctly authenticate, please contact support", err);
          router.push("/");
        });
    }
  }, [router, session?.user?.email]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser, router, session?.user?.email]);

  const value = {
    user,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
