import coin from "@/assets/icons/icon-coin.png";
import saveFilled from "@/assets/icons/icon-save-filled.png";
import saveEmpty from "@/assets/icons/icon-save-outline.png";
import { constants } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useAddScriptToIdea, useSaveAndAddScript, useSaveIdea } from "@/lib/react-query";
import { IdeaType, ScriptDataType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SelectSeparator } from "../ui/select";
import { useToast } from "../ui/use-toast";
import CustomLoader from "./Loader/CustomLoader";

interface GeneratedIdeaProps {
  idea: IdeaType;
}

const GeneratedIdea = ({ idea }: GeneratedIdeaProps) => {
  const [localScript, setLocalScript] = useState<ScriptDataType | undefined>();
  const { user } = useUserContext();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const {
    mutate: saveIdea,
    isPending: isSavingIdea,
    isError: isSavingIdeaError,
    isSuccess: isSavingIdeaSuccess,
  } = useSaveIdea();
  const {
    mutate: addScriptToIdea,
    isPending: isAddingScriptPending,
    isError: isAddingScriptError,
  } = useAddScriptToIdea();
  const {
    mutate: saveAndAddScript,
    isPending: isSavingAndAddingScriptPending,
    isError: isSavingAndAddingScriptError,
    isSuccess: isSavingAndAddingScriptSuccess,
  } = useSaveAndAddScript();
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const savedIdeaRecord = user?.savedIdeas?.find(
    (savedIdea: IdeaType) => savedIdea._id === idea._id,
  );
  const pathname = usePathname();

  const handleGenerateScript = async () => {
    // RE-ADD THIS WHEN TESTING IS DONE await fetch("/api/script", {
    await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(idea),
    })
      .then((res) => {
        return res.clone().json();
      })
      .then((data) => {
        if (!isSavedLocally) {
          const constructedIdea = {
            ...idea,
            script: data.script,
            platform: (searchParams.get("type") || "Instagram Reel") as TypeOfContentToGenerate,
          };
          // If an idea is NOT saved and script is generated -> add the object in the DB with isSaved:true + the script, and update the isSaved locally + the localScript locally.
          saveAndAddScript({ idea: constructedIdea, userEmail: user?.email! });
        } else {
          // If you are in the /generate page, you DON'T HAVE AN IDEA_ID, so you can't update the script in the DB. You just update the localScript. TODO
          addScriptToIdea({ generatedScript: data, ideaId: idea._id, userEmail: user?.email! });
        }

        if (pathname === "/generate") {
          setLocalScript(data);
        }
      })
      .catch(() => {
        toast({
          title: "Error saving script!",
          description: "Please try again later. If the problem persists, contact support.",
        });
      });
  };

  const handleClickSaveIdea = () => {
    // This either adds the object to the savedIdeas or removes it, based on isSaved value.
    saveIdea({
      idea: {
        ...idea,
        platform: (searchParams.get("type") || "Instagram Reel") as TypeOfContentToGenerate,
      },
      email: user?.email!,
    });

    if (isSavingIdeaError) {
      toast({
        title: "Error saving idea!",
        description: "Please try again later. If the problem persists, contact support.",
      });
    }
  };

  useEffect(() => {
    if (isAddingScriptError) {
      toast({
        title: "Error saving script!",
        description: "Please try again later. If the problem persists, contact support.",
      });
    }
  }, [isAddingScriptError, toast]);

  // Is saved differs based on the location we're in.
  useEffect(() => {
    if ((isSavingIdeaSuccess || isSavingAndAddingScriptSuccess) && pathname === "/generate") {
      setIsSavedLocally(true);
    }
  }, [isSavingAndAddingScriptSuccess, isSavingIdeaSuccess, pathname]);

  useEffect(() => {
    setIsSavedLocally(pathname === "/saved" ? true : !!savedIdeaRecord);
  }, [pathname, savedIdeaRecord]);

  return (
    <div className="border-2 border-gray-400 rounded-xl p-5 max-w-[600px] sm:max-w-[900px] w-full">
      {isSavingIdea || isSavingAndAddingScriptPending ? (
        <div className="flex justify-end">
          <CustomLoader />
        </div>
      ) : (
        <Image
          src={isSavedLocally ? saveFilled : saveEmpty}
          alt="save icon"
          width={25}
          height={25}
          priority
          className="object-fit cursor-pointer mb-2 ml-auto transition-transform duration-200 active:scale-110"
          onClick={handleClickSaveIdea}
        />
      )}

      <h2 className="font-semibold">Idea:</h2>
      <SelectSeparator />
      <h2 className="mb-3">{idea.idea}</h2>
      <h2 className="font-semibold">Short description:</h2>
      <SelectSeparator />
      <p className="mb-3">{idea.shortDescription}</p>

      {/* WITHOUT BEING SAVED, WE JUST ATRRIBUTE THE SCRIPT TO ANY IDEA: */}
      {pathname === "/generate" && localScript && (
        <div>
          <h2 className="font-semibold">Script:</h2>
          <SelectSeparator />
          {localScript.script.length > 0 && (
            <>
              {localScript.script.map((scene, index) => (
                <div
                  key={index}
                  className="mb-5"
                >
                  <h2 className="font-semibold">Scene:</h2>
                  <p>{scene.scene}</p>
                  <h2 className="font-semibold">Visuals:</h2>
                  <p>{scene.visuals}</p>
                  <h2 className="font-semibold">Dialogue:</h2>
                  <p>{scene.dialogue}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {/* IF IT GETS SAVED, WE LINK THE SCRIPT WITH THE IDEA AND DISPLAY IT: */}
      <div>
        {idea.script && idea.script.length > 0 && (
          <div>
            <h2 className="font-semibold">Script:</h2>
            <SelectSeparator />
            {idea.script.length > 0 && (
              <>
                {idea.script.map((scene, index) => (
                  <div
                    key={index}
                    className="mb-5"
                  >
                    <h2 className="font-semibold">Scene:</h2>
                    <p>{scene.scene}</p>
                    <h2 className="font-semibold">Visuals:</h2>
                    <p>{scene.visuals}</p>
                    <h2 className="font-semibold">Dialogue:</h2>
                    <p>{scene.dialogue}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-1">
        <Button
          className="bg-gray-500 flex items-center justify-center mt-5"
          onClick={handleGenerateScript}
          disabled={isSavingIdea || isSavingAndAddingScriptPending}
        >
          {isAddingScriptPending && (
            <div className="mr-2">
              <CustomLoader />
            </div>
          )}
          <h2 className="mr-1">
            {isAddingScriptPending
              ? "Generating..."
              : localScript
                ? "Regenerate script"
                : "Generate script"}
          </h2>
          {!isAddingScriptPending && (
            <div className="flex items-center justify-center">
              <Image
                src={coin}
                alt="coin"
                width={25}
                height={25}
                priority
                className="object-fit"
              />
              <h3>{constants.scriptPrice}</h3>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GeneratedIdea;
