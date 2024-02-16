"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [niche, setNiche] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [data, setData] = useState();

  const handleSubmit = async () => {
    await fetch("http://localhost:3000/api/prompt", {
      method: "POST",
      body: JSON.stringify({ niche, keywords }),
    })
      .then((res) => {
        console.log("res.json():", res.clone().json());
        setNiche("");
        setKeywords("");
        return res.clone().json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log("err:", err));
  };

  useEffect(() => {
    console.log("DATA:", data);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100 text-center md:py-24 gap-4 dark:bg-gray-800 ">
      <div className="grid gap-4 ">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl dark:text-gray-50">
            Generate Content Ideas
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl md:mx-auto dark:text-gray-400">
            Enter your niche and a few keywords below to get started. We will
            use this information to generate a list of content ideas that are
            tailored to your audience.
          </p>
        </div>
        <div className="w-full  space-y-2 ">
          <form className="grid gap-2 md:flex md:gap-4">
            <Input
              className="w-full md:w-1/3"
              placeholder="Enter your niche..."
              type="text"
              onChange={(e) => setNiche(e.target.value)}
            />
            <Input
              className="w-full md:w-2/3"
              placeholder="Enter keywords..."
              type="text"
              onChange={(e) => setKeywords(e.target.value)}
            />
            <Button
              className="w-full md:w-auto"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Generate Ideas
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1>Content ideas:</h1>
          {data && <span>{data}</span>}
        </div>
      </div>
    </div>
  );
}
