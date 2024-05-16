"use client";
import GeneratedIdea from "@/components/shared/GeneratedIdea";
import GenerationForm from "@/components/shared/GenerationForm";
import { useUserContext } from "@/context/AuthContext";
import { DataType } from "@/types/idea.types";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const Generate = () => {
  const { user } = useUserContext();
  const [data, setData] = useState<DataType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (form: UseFormReturn<any>) => {
    setIsLoading(true);
    await fetch("http://localhost:3000/api/prompt", {
      method: "POST",
      body: JSON.stringify(form.getValues()),
    })
      .then((res) => {
        console.log("RES:", res);
        return res.clone().json();
      })
      .then((data) => {
        console.log("DATA:", JSON.parse(data));
        setData(JSON.parse(data));
      })
      .catch((err) => console.log("err:", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h1 className="text-center text-[26px] font-bold">✨ Content generation</h1>
      <div className="flex flex-col items-start justify-start w-[100%] p-5 rounded-xl">
        <div className="flex-1 flex-col flex w-full">
          <h2 className="text-center font-semibold">Configure generation options:</h2>
          <GenerationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="flex-1 mt-10">
          <h2 className="text-center font-semibold">Results:</h2>
          <div className="mt-10 flex flex-col items-center justify-center flex-wrap gap-4">
            {data && data.ideas.length > 0 ? (
              data.ideas.map((idea) => (
                <GeneratedIdea
                  key={idea.id}
                  idea={idea}
                />
              ))
            ) : (
              <h2>This list is empty.</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
