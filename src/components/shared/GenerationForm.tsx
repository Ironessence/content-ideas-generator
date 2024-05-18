import React from "react";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import GenerationFormField from "./GenerationFormField";
import {
  instagramContentType,
  optimizeForType,
  toneType,
  videoLengthType,
} from "../../utils/generationData";
import { Input } from "../ui/input";
import CustomLoader from "./Loader/CustomLoader";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface GenerationFormProps {
  onSubmit: (form: UseFormReturn<any>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const GenerationForm = ({ onSubmit, isLoading, setIsLoading }: GenerationFormProps) => {
  const formSchema = z.object({
    contentType: z.string(),
    toneType: z.string(),
    videoLength: z.string(),
    optimizeFor: z.string(),
    niche: z.string(),
    keywords: z.string(),
    additionalInfo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "Reel",
      toneType: "None",
      videoLength: "0-15 seconds",
      optimizeFor: "Nothing",
      niche: "",
      keywords: "",
      additionalInfo: "",
    },
  });

  const handleFormSubmit = () => {
    onSubmit(form);
  };

  const handleSelectContentType = (contentType: string) => {
    form.setValue("contentType", contentType);
  };

  const handleSelectToneType = (toneType: string) => {
    form.setValue("toneType", toneType);
  };

  const handleSelectVideoLengthType = (videoLength: string) => {
    form.setValue("videoLength", videoLength);
  };

  const handleSelectOptimizeFor = (optimizeFor: string) => {
    form.setValue("optimizeFor", optimizeFor);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="text-black flex flex-col gap-2 w-full md:items-center  "
      >
        <div className="flex flex-wrap gap-5 items-center ">
          {/* CONTENT TYPE */}
          <GenerationFormField
            form={form}
            title="Content Type"
            name="contentType"
            choices={instagramContentType.map((item) => item.title)}
            onChange={handleSelectContentType}
          />

          {/* ADDITIONAL FIELDS BASED ON CONTENT TYPE */}

          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Tone"
              name="toneType"
              choices={toneType.map((item) => item.title)}
              onChange={handleSelectToneType}
            />
          )}

          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Video Length"
              name="videoLength"
              choices={videoLengthType.map((item) => item.title)}
              onChange={handleSelectVideoLengthType}
            />
          )}

          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Optimize for"
              name="optimizeFor"
              choices={optimizeForType.map((item) => item.title)}
              onChange={handleSelectOptimizeFor}
            />
          )}
        </div>

        <div>
          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Niche"
              name="niche"
              onChange={(value) => form.setValue("niche", value)}
              formField={
                <>
                  <Label className="text-white">Niche</Label>
                  <Input
                    value={form.watch("niche")}
                    onChange={(e) => form.setValue("niche", e.target.value)}
                    placeholder="e.g. Video Games"
                    className="max-w-[350px] min-w-[300px]"
                  />
                </>
              }
            />
          )}

          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Keywords"
              name="keywords"
              onChange={(value) => form.setValue("keywords", value)}
              formField={
                <>
                  <Label className="text-white">Keywords</Label>
                  <Input
                    value={form.watch("keywords")}
                    onChange={(e) => form.setValue("keywords", e.target.value)}
                    placeholder="e.g. Fortnite, League of Legends, Call of Duty"
                    className="max-w-[350px] min-w-[300px]"
                  />
                </>
              }
            />
          )}

          {form.watch("contentType") != null && (
            <GenerationFormField
              form={form}
              title="Additional information"
              name="additionalInfo"
              onChange={(value) => form.setValue("additionalInfo", value)}
              formField={
                <>
                  <Label className="text-white">Additional info</Label>
                  <Textarea
                    value={form.watch("additionalInfo")}
                    onChange={(e) => form.setValue("additionalInfo", e.target.value)}
                    placeholder="e.g. List interesting facts about Call of Duty"
                    className="resize-none max-w-[350px] min-w-[300px]"
                  />
                </>
              }
            />
          )}
        </div>
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 self-center mt-5 bg-pink-500 hover:bg-pink-600 "
          >
            {isLoading && <CustomLoader />}
            {isLoading ? "Generating..." : "Generate ✨"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GenerationForm;
