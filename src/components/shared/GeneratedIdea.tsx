import coin from "@/assets/icons/icon-coin.png";
import saveFilled from "@/assets/icons/icon-save-filled.png";
import saveEmpty from "@/assets/icons/icon-save-outline.png";
import { useUserContext } from "@/context/AuthContext";
import { handleSaveIdea } from "@/lib/clientApi";
import { IdeaType, ScriptDataType } from "@/types/idea.types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import CustomLoader from "./Loader/CustomLoader";

interface GeneratedIdeaProps {
  idea: IdeaType;
}

const GeneratedIdea = ({ idea }: GeneratedIdeaProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false);
  const [script, setScript] = useState<ScriptDataType | undefined>();
  const [isError, setIsError] = useState<boolean>(false);
  const { user } = useUserContext();
  const pathname = usePathname();

  const handleGenerateScript = async () => {
    setIsLoading(true);
    await fetch("http://localhost:3000/api/script", {
      method: "POST",
      body: JSON.stringify(idea),
    })
      .then((res) => {
        console.log("RES:", res);
        return res.clone().json();
      })
      .then((data) => {
        console.log("DATA:", JSON.parse(data));
        setScript(JSON.parse(data));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleClickSaveIdea = () => {
    setIsSavingLoading(true);
    handleSaveIdea(idea, user?.email!)
      .then(() => setIsSaved((prev) => !prev))
      .catch((err) => console.log("error when saving idea:", err))
      .finally(() => setIsSavingLoading(false));
  };

  return (
    <div className="border-2 border-gray-400 rounded-xl p-5 max-w-[600px] ">
      {pathname !== "/saved" ? (
        isSavingLoading ? (
          <div className="flex justify-end">
            <CustomLoader />
          </div>
        ) : (
          <Image
            src={isSaved ? saveFilled : saveEmpty}
            alt="save icon"
            width={25}
            height={25}
            priority
            className="object-fit cursor-pointer mb-2 ml-auto transition-transform duration-200 active:scale-110"
            onClick={handleClickSaveIdea}
          />
        )
      ) : null}
      <h2 className="font-semibold">Idea:</h2>
      <h2 className="mb-3">{idea.idea}</h2>
      <h2 className="font-semibold">Short description:</h2>
      <p className="mb-3">{idea.shortDescription}</p>
      <h2 className="font-semibold">Estimated virality score:</h2>
      <p className="mb-3">{idea.viralityScore}</p>
      {isError && (
        <p>
          There was an error generating the script. Please wait for a few seconds then try again. If
          the problem persists, please contact us.
        </p>
      )}
      {script && script.script.length > 0 && (
        <>
          <h2 className="font-semibold">Script:</h2>
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
      <div className="flex items-center justify-end gap-1">
        <Button
          className="bg-gray-500 flex items-center justify-center"
          onClick={handleGenerateScript}
          disabled={isLoading}
        >
          {isLoading && <CustomLoader />}
          <h2 className="mr-1">
            {isLoading ? "Generating..." : script ? "Regenerate script" : "Generate script"}
          </h2>
          {!isLoading && (
            <div className="flex items-center justify-center gap-1">
              <Image
                src={coin}
                alt="coin"
                width={25}
                height={25}
                priority
                className="object-fit"
              />
              <h3>50</h3>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GeneratedIdea;
