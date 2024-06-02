"use client";
import empty from "@/assets/icons/icon-empty.png";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import GenerationForm from "@/components/shared/GenerationForm";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { constants } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import { subtractUserTokens } from "@/lib/clientApi";
import { DataType } from "@/types/idea.types";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

const Generate = () => {
  const { user, refreshUser } = useUserContext();
  const [data, setData] = useState<DataType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleOpenModal } = useDataContext();

  if (!user) {
    return null;
  }

  // const handleSubmit = async (form: UseFormReturn<any>) => {
  //   setIsLoading(true);

  //   await fetch("http://localhost:3000/api/test", {
  //     method: "POST",
  //     body: JSON.stringify(form.getValues()),
  //   })
  //     .then((res) => {
  //       console.log("RES:", res);
  //       return res.clone().json();
  //     })
  //     .then((data) => {
  //       //console.log("DATA:", JSON.parse(data));
  //       // setData(JSON.parse(data));
  //       console.log("DATA:", data);
  //       setData(data);
  //     })
  //     .catch((err) => console.log("err:", err))
  //     .finally(() => setIsLoading(false));
  // };

  const handleSubmit = async (form: UseFormReturn<any>) => {
    setIsLoading(true);
    let sufficientTokens = true;

    await subtractUserTokens(user, constants.ideasPrice)
      .then((res) => console.log("RES:", res))
      .catch((err) => {
        console.log("err:", err);
        handleOpenModal("InsufficientTokens");
        sufficientTokens = false;
        setIsLoading(false);
        return;
      });

    if (sufficientTokens) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
        .then(() =>
          fetch("http://localhost:3000/api/test", {
            method: "POST",
            body: JSON.stringify(form.getValues()),
          }),
        )
        .then((res) => {
          console.log("RES:", res);
          return res.clone().json();
        })
        .then((data) => {
          console.log("DATA:", data);
          setData(data);
        })
        .catch((err) => console.log("err:", err))
        .finally(() => {
          setIsLoading(false);
          refreshUser();
        });
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)]">
      <h1 className="text-center text-[24px] font-bold mt-5">
        Generate <span className="bg-pink-500 p-1 px-2">Instagram</span> Ideas
      </h1>
      {/* CONTAINER */}
      <div className="flex flex-col items-center justify-center w-[100%] p-5 rounded-xl ">
        {/* LEFT SIDE */}
        <div className="flex-1 flex-col flex w-full items-center justify-center ">
          <h2 className=" font-semibold mb-5">Configuration:</h2>
          <GenerationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="flex-1 mt-10 w-full items-center justify-center ">
          <h2 className="text-center font-semibold">Results:</h2>
          <div className="mt-10 flex flex-col items-center justify-center flex-wrap gap-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-7 w-full md:flex-row md:w-[75%] md:mb-10 ">
                <SkeletonCard />
              </div>
            )}
            {data && data.ideas.length > 0 ? (
              data.ideas.map((idea) => (
                <GeneratedIdea
                  key={idea._id}
                  idea={idea}
                />
              ))
            ) : (
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
