import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

import { Button } from "../ui/button";
import Image from "next/image";
import insta from "@/assets/icons/insta.png";
import yt from "@/assets/icons/youtube.png";
import reel from "@/assets/icons/reel.png";
import post from "@/assets/icons/post2.png";
import story from "@/assets/icons/story.png";
import ytvideo from "@/assets/icons/yt-video.png";
import ytshorts from "@/assets/icons/yt-shorts.png";

enum PlatformEnum {
  Instagram = "Instagram",
  Youtube = "Youtube",
}

enum InstagramContentTypeEnum {
  Reel = "Reel",
  Post = "Post",
  Story = "Story",
}

enum YouTubeContentTypeEnum {
  Video = "Video",
  Shorts = "Shorts",
}

const GenerationForm = () => {
  const formSchema = z.object({
    platform: z.enum([PlatformEnum.Instagram, PlatformEnum.Youtube]).optional(),
    contentType: z
      .enum([
        InstagramContentTypeEnum.Reel,
        InstagramContentTypeEnum.Post,
        InstagramContentTypeEnum.Story,
        YouTubeContentTypeEnum.Video,
        YouTubeContentTypeEnum.Shorts,
      ])
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-black"
      >
        {/* PLATFORM */}
        <FormField
          control={form.control}
          name="platform"
          render={() => (
            <FormItem>
              <FormLabel className="text-white">Platform:</FormLabel>
              <div className="flex gap-3">
                {Object.values(PlatformEnum).map((key) => (
                  <div
                    key={key}
                    className={`flex flex-col h-[100px] w-[100px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch("platform") === key ? "bg-slate-600" : ""}`}
                    onClick={() => form.setValue("platform", key)}
                  >
                    <Image
                      src={key === "Instagram" ? insta : yt}
                      alt="instagram"
                      priority
                      className="w-[60px] h-[60px] aspect-square self-top mx-auto mt-3"
                    />
                    <span className="text-white text-center text-[14px] font-semibold">{key}</span>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />

        {/* CONTENT TYPE */}
        {form.watch("platform") != null && (
          <FormField
            control={form.control}
            name="contentType"
            render={() => (
              <FormItem>
                <FormLabel className="text-white">Content Type:</FormLabel>
                <div className="flex gap-3">
                  {form.watch("platform") === "Instagram"
                    ? Object.values(InstagramContentTypeEnum).map((key) => (
                        <div
                          key={key}
                          className={`flex flex-col h-[100px] w-[100px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch("contentType") === key ? "bg-slate-600" : ""}`}
                          onClick={() => form.setValue("contentType", key)}
                        >
                          <Image
                            src={
                              key === InstagramContentTypeEnum.Reel
                                ? reel
                                : key === InstagramContentTypeEnum.Post
                                  ? post
                                  : story
                            }
                            alt="content type"
                            priority
                            className="w-[60px] h-[60px] aspect-square self-top mx-auto mt-3"
                          />
                          <span className="text-white text-center text-[14px] font-semibold">
                            {key}
                          </span>
                        </div>
                      ))
                    : Object.values(YouTubeContentTypeEnum).map((key) => (
                        <div
                          key={key}
                          className={`flex flex-col h-[100px] w-[100px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch("contentType") === key ? "bg-slate-600" : ""}`}
                          onClick={() => form.setValue("contentType", key)}
                        >
                          <Image
                            src={key === YouTubeContentTypeEnum.Video ? ytvideo : ytshorts}
                            alt="content type"
                            priority
                            className="w-[60px] h-[60px] aspect-square self-top mx-auto mt-3"
                          />
                          <span className="text-white text-center text-[14px] font-semibold">
                            {key}
                          </span>
                        </div>
                      ))}
                </div>
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
