import coin from "@/assets/icons/icon-coin.png";
import saveFilled from "@/assets/icons/icon-save-filled.png";
import saveEmpty from "@/assets/icons/icon-save-outline.png";
import { constants } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { handleSaveIdea } from "@/lib/clientApi";
import { IdeaType, ScriptDataType } from "@/types/idea.types";
import { TypeOfContentToGenerate } from "@/types/typeOfContentToGenerate";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { SelectSeparator } from "../ui/select";
import { useToast } from "../ui/use-toast";
import CustomLoader from "./Loader/CustomLoader";

interface GeneratedIdeaProps {
  idea: IdeaType;
  onSave?: (idea: IdeaType) => void;
}

const GeneratedIdea = ({ idea, onSave }: GeneratedIdeaProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false);
  // Fix script type
  const [script, setScript] = useState<ScriptDataType | undefined>();
  const [isError, setIsError] = useState<boolean>(false);
  const { user } = useUserContext();
  const { toast } = useToast();

  const searchParams = useSearchParams();

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleGenerateScript = async () => {
    setIsLoading(true);
    await fetch("/api/script", {
      method: "POST",
      body: JSON.stringify(idea),
    })
      .then((res) => {
        return res.clone().json();
      })
      .then((data) => {
        if ((idea.isSaved || isSaved) && searchParams.get("type")) {
          console.log("save idea with script now!");
          // Add the script to an already existing saved idea
          setScript(JSON.parse(data));
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleClickSaveIdea = () => {
    setIsSavingLoading(true);

    if (searchParams.get("type")) {
      handleSaveIdea(
        {
          ...idea,
          script: script?.script as any,
          platform: searchParams.get("type") as TypeOfContentToGenerate,
        },
        user?.email!,
      )
        .then(() => {
          if (onSave) {
            onSave(idea);
          }
          setIsSaved(true);
        })
        .catch(() => {
          toast({
            title: "Error saving idea!",
            description: "Please try again later. If the problem persists, contact support.",
          });
        })
        .finally(() => setIsSavingLoading(false));
    }
  };

  return (
    <div className="border-2 border-gray-400 rounded-xl p-5 max-w-[600px] sm:max-w-[900px] w-full">
      {isSavingLoading ? (
        <div className="flex justify-end">
          <CustomLoader />
        </div>
      ) : (
        <Image
          src={idea.isSaved || isSaved ? saveFilled : saveEmpty}
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

      {isError && (
        <p>
          There was an error generating the script. Please wait for a few seconds then try again. If
          the problem persists, please contact us.
        </p>
      )}
      {/* WITHOUT BEING SAVED, WE JUST ATRRIBUTE THE SCRIPT TO ANY IDEA: */}
      {script && script.script.length > 0 && (
        <>
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
        </>
      )}
      {/* IF IT GETS SAVED, WE LINK THE SCRIPT WITH THE IDEA AND DISPLAY IT: */}
      {idea.script && idea.script.length > 0 && (
        <>
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
        </>
      )}
      <div className="flex items-center justify-end gap-1">
        <Button
          className="bg-gray-500 flex items-center justify-center mt-5"
          onClick={handleGenerateScript}
          disabled={isLoading}
        >
          {isLoading && (
            <div className="mr-2">
              <CustomLoader />
            </div>
          )}
          <h2 className="mr-1">
            {isLoading ? "Generating..." : script ? "Regenerate script" : "Generate script"}
          </h2>
          {!isLoading && (
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
