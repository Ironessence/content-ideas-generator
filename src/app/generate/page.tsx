"use client";
import empty from "@/assets/icons/icon-empty.png";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import GenerationForm from "@/components/shared/GenerationForm";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { useToast } from "@/components/ui/use-toast";
import { constants } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { subtractUserTokens } from "@/lib/clientApi";
import { DataType } from "@/types/idea.types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const Generate = () => {
  const { user, refreshUser } = useUserContext();
  const [data, setData] = useState<DataType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const resultsDivRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const typeOfContentToGenerate = searchParams.get("type") || "Instagram Reel";
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleSubmit = async (form: UseFormReturn<any>) => {
    setIsLoading(true);
    setData(undefined);
    if (user.tokens < constants.ideasPrice) {
      router.push("/buy-tokens");
      setIsLoading(false);
      return;
    }

    //Construct the object with values from form + platform
    const object = {
      ...form.getValues(),
      platform: typeOfContentToGenerate,
    };

    fetch("/api/prompt", {
      method: "POST",
      body: JSON.stringify(object),
    })
      .then((res) => {
        if (resultsDivRef.current) {
          resultsDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
        return res.clone().json();
      })
      .then((data) => {
        console.log("DATA: ", data);
        setData(JSON.parse(data));
        console.log("PARSED DATA:", JSON.parse(data));
        subtractUserTokens(user, constants.ideasPrice)
          .then()
          .catch(() => {
            toast({
              title: "There was a problem generating ideas.",
              description: "Please try again later. If the problem persists, contact support.",
            });
            setIsLoading(false);
            return;
          });
      })
      .catch(() => {
        toast({
          title: "Unable to generate ideas.",
          description: "Please try again later. If the problem persists, contact support.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        refreshUser();
      });
  };

  return (
    <div className="min-h-[calc(100vh-90px)]">
      <h1 className="text-center text-[22px] sm:text-[26px] font-bold mt-5">
        Generate{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 px-3 rounded-md">
          {typeOfContentToGenerate}
        </span>{" "}
        Ideas
      </h1>
      {/* CONTAINER */}
      <div className="flex flex-col items-center justify-center w-[100%] p-5 rounded-xl ">
        {/* LEFT SIDE */}
        <div className="flex-1 flex-col flex w-full items-center justify-center ">
          <h2 className="font-semibold mb-5">Configuration:</h2>
          <GenerationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div
          ref={resultsDivRef}
          className="flex-1 mt-10 w-full items-center justify-center  "
        >
          <h2 className="text-center font-semibold">Results:</h2>
          <div className="mt-10 flex flex-col items-center justify-center flex-wrap gap-4">
            {isLoading && (
              <div className="flex flex-col w-full sm:max-w-[900px] md:mb-10  items-center  justify-center">
                <SkeletonCard />
              </div>
            )}
            {data && data.ideas.length > 0
              ? data.ideas.map((idea) => (
                  <GeneratedIdea
                    key={idea._id}
                    idea={idea}
                  />
                ))
              : !isLoading &&
                !data && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Image
                      src={empty}
                      alt="empty"
                      width={40}
                      height={40}
                    />
                    <h2 className="text-center text-gray-300">This list is empty.</h2>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
