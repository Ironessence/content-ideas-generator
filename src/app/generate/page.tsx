"use client";
import GenerationForm from "@/components/shared/GenerationForm";
import { useUserContext } from "@/context/AuthContext";
import React from "react";

const Generate = () => {
  const { user } = useUserContext();

  // const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   await fetch("http://localhost:3000/api/prompt", {
  //     method: "POST",
  //     body: JSON.stringify({ niche, keywords, tone, format }),
  //   })
  //     .then((res) => {
  //       setNiche("");
  //       setKeywords("");
  //       setTone(undefined);
  //       setFormat(undefined);
  //       return res.clone().json();
  //     })
  //     .then((data) => {
  //       setData(JSON.parse(data));
  //     })
  //     .catch((err) => console.log("err:", err));
  // };

  return (
    <div>
      <h1 className="text-center text-[26px] font-bold">Content generation</h1>
      <div className="flex items-start justify-start w-[100%] h-screen p-5 rounded-xl">
        <div className="flex-1 flex flex-col">
          <h2 className="text-center">Select options:</h2>
          <GenerationForm />
        </div>
        <div className="flex-1">
          <h2 className="text-center">Results:</h2>
        </div>
      </div>
    </div>
  );
};

export default Generate;
