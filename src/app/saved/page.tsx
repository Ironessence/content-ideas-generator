"use client";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import CustomLoader from "@/components/shared/Loader/CustomLoader";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedIdeas } from "@/lib/react-query";
import { IdeaType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Saved = () => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const {
    data: savedIdeas,
    isLoading,
    isError,
  } = useGetSavedIdeas(
    user?.email!,
    (searchParams.get("type") || "Instagram Reel") as TypeOfContentToGenerate,
  );

  const onSave = (idea: IdeaType) => {
    // setSavedIdeas((prevIdeas) => prevIdeas.filter((prevIdea) => prevIdea._id !== idea._id));
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error obtaining saved ideas",
        description: "Please try again. If the problem persists, contact support.",
      });
    }
  }, [isError, toast]);

  return (
    <div className="flex flex-col w-[95%] ml-auto mr-auto min-h-[calc(100vh-70px)]">
      <div className="flex w-full sm:w-[80%] mr-auto ml-auto flex-wrap items-center justify-center gap-5 pb-5">
        {!isLoading && savedIdeas.length === 0 && (
          <h2 className="text-center text-slate-400">No saved ideas to display.</h2>
        )}
        {isLoading && <CustomLoader />}
        {!isLoading &&
          savedIdeas.length > 0 &&
          savedIdeas.map((idea: IdeaType) => (
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
