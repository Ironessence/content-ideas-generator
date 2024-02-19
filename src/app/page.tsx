"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataType } from "@/types/idea.types";
import { useUserContext } from "@/context/AuthContext";
import SignInDialog from "@/components/shared/SignInDialog";

export default function Home() {
  const { user } = useUserContext();

  const [niche, setNiche] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [tone, setTone] = useState<string | undefined>();
  const [format, setFormat] = useState<string | undefined>();
  const [data, setData] = useState<DataType | undefined>();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/prompt", {
      method: "POST",
      body: JSON.stringify({ niche, keywords, tone, format }),
    })
      .then((res) => {
        setNiche("");
        setKeywords("");
        setTone(undefined);
        setFormat(undefined);
        return res.clone().json();
      })
      .then((data) => {
        setData(JSON.parse(data));
      })
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
                onChange={(e) => setNiche(e.target.value)}
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
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="tone"
              >
                Tone
              </label>
              <Select onValueChange={setTone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tone</SelectLabel>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="entertaining">Entertaining</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
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
              <Select onValueChange={setFormat}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Format</SelectLabel>
                    <SelectItem value="5-10 seconds">5-10 sec</SelectItem>
                    <SelectItem value="10-30 seconds">10-30 sec</SelectItem>
                    <SelectItem value="30-60 seconds">30-60 sec</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-slate-950 w-auto mt-5"
              type="submit"
              onClick={(e) => {
                if (user) {
                  handleSubmit(e);
                } else {
                  console.log("else");
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLoginOpen(true);
                }
              }}
            >
              Generate
            </Button>
          </form>
        </div>

        <div className="flex flex-col flex-1">
          <h2 className="text-center font-bold text-xl">Ideas:</h2>
          {data ? (
            data.ideas.map((idea) => (
              <div
                className="flex flex-col"
                key={idea.id}
              >
                <h2 className="font-bold text-center">{`Idea #${idea.id}`}</h2>
                <h3>Hook: {idea.hook}</h3>
                <h3>Idea: {idea.idea}</h3>
                <h3>Virality score: {idea.viralityScore}</h3>
              </div>
            ))
          ) : (
            <h3 className="mt-3">It is empty here. Generate something?</h3>
          )}
        </div>
      </div>
      <SignInDialog
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </>
  );
}
