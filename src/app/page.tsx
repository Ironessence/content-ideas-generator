"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <>
      <div className="bg-gray-50/90 py-6 w-full">
        <div className="container flex items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Content Ideas
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Generate unlimited content ideas with the help of AI with a few clicks
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 px-4 text-center md:px-6 ">
        <div className="flex flex-col flex-1">
          <form className="flex flex-col items-center gap-3">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="niche"
              >
                Niche
              </label>
              <Input
                id="niche"
                placeholder="Enter your niche"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="keywords"
              >
                Keywords
              </label>
              <Input
                id="keywords"
                placeholder="Enter your keywords"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="tone"
              >
                Tone
              </label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tone</SelectLabel>
                    <SelectItem value="apple">Informative</SelectItem>
                    <SelectItem value="banana">Entertaining</SelectItem>
                    <SelectItem value="blueberry">Funny</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="format"
              >
                Format
              </label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Format</SelectLabel>
                    <SelectItem value="apple">5-10 sec</SelectItem>
                    <SelectItem value="banana">10-30 sec</SelectItem>
                    <SelectItem value="blueberry">30-60 sec</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-slate-950 w-auto mt-5">Generate</Button>
          </form>
        </div>

        <div className="flex flex-col flex-1">
          <h2 className="text-center font-bold text-xl">Ideas:</h2>
          {data ? data : <h3 className="mt-3">It is empty here. Generate something?</h3>}
        </div>
      </div>
    </>
  );
}
