import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import insta from "@/assets/icons/insta.png";
import yt from "@/assets/icons/youtube.png";

enum PlatformEnum {
  Instagram = "Instagram",
  Youtube = "Youtube",
}

const GenerationForm = () => {
  const formSchema = z.object({
    platform: z.enum([PlatformEnum.Instagram, PlatformEnum.Youtube]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: PlatformEnum.Instagram,
    },
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
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
