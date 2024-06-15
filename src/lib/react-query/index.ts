import { IUser } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFromDb, subtractUserTokens } from "../clientApi";
import { QUERY_KEYS } from "./queryKeys";

export const useGetUser = (email: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER, email],
    queryFn: () => getUserFromDb(email),
    enabled: !!email,
  });
};

export const useSubtractUserTokens = (user: IUser, tokens: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => subtractUserTokens(user, tokens),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
    },
  });
};
