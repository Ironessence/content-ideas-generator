import coin from "@/assets/icons/icon-coin.png";
import saveFilled from "@/assets/icons/icon-save-filled.png";
import saveEmpty from "@/assets/icons/icon-save-outline.png";
import { constants } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { handleAddScriptToSavedIdea } from "@/lib/clientApi";
import { useSaveIdea } from "@/lib/react-query";
import { IdeaType, ScriptDataType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SelectSeparator } from "../ui/select";
import { useToast } from "../ui/use-toast";
import CustomLoader from "./Loader/CustomLoader";

interface GeneratedIdeaProps {
  idea: IdeaType;
}

const GeneratedIdea = ({ idea }: GeneratedIdeaProps) => {
  //const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false);
  const [script, setScript] = useState<ScriptDataType | undefined>();
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);
  const { user } = useUserContext();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { mutate: saveIdea, isPending: isSavingIdea, isError } = useSaveIdea();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const savedIdeaRecord = user?.savedIdeas?.find(
    (savedIdea: IdeaType) => savedIdea._id === idea._id,
  );

  useEffect(() => {
    setIsSaved(!!savedIdeaRecord);
  }, [savedIdeaRecord]);

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
        if (isSaved && searchParams.get("type")) {
          // RE-ADD THIS WHEN TESTING IS DONE const generatedScript = JSON.parse(data);
          const generatedScript = data;
          handleAddScriptToSavedIdea(generatedScript, idea._id, user?.email!)
            .then((res) => {
              setScript(res);
            })
            .catch(() => {
              toast({
                title: "Error saving script!",
                description: "Please try again later. If the problem persists, contact support.",
              });
            })
            .finally(() => setIsRefreshed(true));
        } else {
          setScript(data.script);
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
    saveIdea({
      idea: {
        ...idea,
        platform: (searchParams.get("type") || "Instagram Reel") as TypeOfContentToGenerate,
      },
      email: user?.email!,
    });

    if (isError) {
      toast({
        title: "Error saving idea!",
        description: "Please try again later. If the problem persists, contact support.",
      });
    }
  };

  return (
    <div className="border-2 border-gray-400 rounded-xl p-5 max-w-[600px] sm:max-w-[900px] w-full">
      {isSavingIdea ? (
        <div className="flex justify-end">
          <CustomLoader />
        </div>
      ) : (
        // TODO: Work on saving an idea correctly
        <Image
          src={isSaved ? saveFilled : saveEmpty}
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
      {script && script.script.length > 0 && idea?.script?.length === 0 && (
        <div key={isRefreshed ? "refreshed" : "not-refreshed"}>
          <h2 className="font-semibold">Script:</h2>
          <SelectSeparator />
          {script.script.length > 0 && (
            <>
              {script.script.map((scene, index) => (
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
          disabled={isSavingIdea}
        >
          {isSavingIdea && (
            <div className="mr-2">
              <CustomLoader />
            </div>
          )}
          <h2 className="mr-1">
            {isSavingIdea ? "Generating..." : script ? "Regenerate script" : "Generate script"}
          </h2>
          {!isSavingIdea && (
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
