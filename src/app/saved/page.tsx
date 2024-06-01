"use client";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import CustomLoader from "@/components/shared/Loader/CustomLoader";
import { useUserContext } from "@/context/AuthContext";
import { getUserSavedIdeas } from "@/lib/clientApi";
import { IdeaType } from "@/types/idea.types";
import { useEffect, useState } from "react";

const Saved = () => {
  const { user } = useUserContext();
  const [savedIdeas, setSavedIdeas] = useState<IdeaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      getUserSavedIdeas(user.email)
        .then((data) => {
          setSavedIdeas(data);
        })
        .catch((err) => console.log("Error when getting user transactions", err))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-70px)]">
      <h1 className="text-center my-5 text-[20px] font-bold">Saved Ideas & Content</h1>
      <div className="flex w-full sm:w-[80%] mr-auto ml-auto flex-wrap items-center justify-center gap-5">
        {!isLoading && savedIdeas.length === 0 && (
          <h2 className="text-center text-slate-400">No saved ideas to display.</h2>
        )}
        {isLoading && <CustomLoader />}
        {!isLoading &&
          savedIdeas.length > 0 &&
          savedIdeas.map((idea) => (
            <GeneratedIdea
              key={idea.id}
              idea={idea}
            />
          ))}
      </div>
    </div>
  );
};

export default Saved;
