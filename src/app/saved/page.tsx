"use client";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import CustomLoader from "@/components/shared/Loader/CustomLoader";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { getUserSavedIdeas } from "@/lib/clientApi";
import { IdeaType } from "@/types/idea.types";
import { useEffect, useState } from "react";

const Saved = () => {
  const { user } = useUserContext();
  const [savedIdeas, setSavedIdeas] = useState<IdeaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const onSave = (idea: IdeaType) => {
    setSavedIdeas((prevIdeas) => prevIdeas.filter((prevIdea) => prevIdea._id !== idea._id));
  };

  useEffect(() => {
    if (user) {
      // TODO: Implement get saved ideas
      getUserSavedIdeas(user.email, "Instagram Reel")
        .then((data) => {
          setSavedIdeas(data);
        })
        .catch(() => {
          toast({
            title: "Error obtaining saved ideas",
            description: "Please try again. If the problem persists, contact support.",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [toast, user]);

  return (
    <div className="flex flex-col w-[95%] ml-auto mr-auto min-h-[calc(100vh-70px)]">
      <h1 className="text-center my-5 text-[20px] font-bold">Saved Ideas & Content</h1>
      <div className="flex w-full sm:w-[80%] mr-auto ml-auto flex-wrap items-center justify-center gap-5 pb-5">
        {!isLoading && savedIdeas.length === 0 && (
          <h2 className="text-center text-slate-400">No saved ideas to display.</h2>
        )}
        {isLoading && <CustomLoader />}
        {!isLoading &&
          savedIdeas.length > 0 &&
          savedIdeas.map((idea) => (
            <GeneratedIdea
              key={idea._id}
              idea={idea}
              onSave={onSave}
            />
          ))}
      </div>
    </div>
  );
};

export default Saved;
