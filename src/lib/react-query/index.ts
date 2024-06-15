import { IdeaType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import { IUser } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSavedIdeas,
  getUserFromDb,
  getUserTransactions,
  handleSaveIdea,
  subtractUserTokens,
} from "../clientApi";
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

export const useGetUserTransactions = (email: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_TRANSACTIONS, email],
    queryFn: () => getUserTransactions(email),
    enabled: !!email,
  });
};

export const useGetSavedIdeas = (email: string, platform: TypeOfContentToGenerate) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_IDEAS],
    queryFn: () => getSavedIdeas(email, platform),
    enabled: !!email,
  });
};

export const useGetIdeaById = (
  email: string,
  platform: TypeOfContentToGenerate,
  ideaId: string,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_IDEA_BY_ID, email, platform, ideaId],
    queryFn: () => getSavedIdeas(email, platform),
    enabled: !!email,
  });
};

export const useSaveIdea = (idea: IdeaType, email: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => handleSaveIdea(idea, email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_IDEAS, QUERY_KEYS.GET_IDEA_BY_ID],
      });
    },
  });
};
