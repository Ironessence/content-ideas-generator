import React, { FormEvent, useEffect } from "react";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import GenerationFormField from "./GenerationFormField";
import { instagramContentType, toneType, videoLengthType } from "../../utils/generationData";
import ChoiceCard from "./ChoiceCard";
import { Input } from "../ui/input";
import CustomLoader from "./Loader/CustomLoader";

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
    niche: z.string(),
    keywords: z.string(),
    additionalInfo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toneType: "None",
      niche: "",
      keywords: "",
      additionalInfo: "",
      videoLength: "0-15 seconds",
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className=" text-black flex items-start flex-wrap gap-5"
      >
        {/* CONTENT TYPE */}
        <GenerationFormField
          form={form}
          title="Content Type"
          name="contentType"
          choices={instagramContentType.map((item) => (
            <ChoiceCard
              image={item.image}
              title={item.title}
              key={item.title}
              onSelect={handleSelectContentType}
              form={form}
              formFieldName="contentType"
            />
          ))}
        />

        {/* ADDITIONAL FIELDS BASED ON CONTENT TYPE */}

        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Tone"
            name="toneType"
            choices={toneType.map((item) => (
              <ChoiceCard
                image={item.image}
                title={item.title}
                key={item.title}
                onSelect={handleSelectToneType}
                form={form}
                formFieldName="toneType"
              />
            ))}
          />
        )}

        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Video Length"
            name="videoLength"
            choices={videoLengthType.map((item) => (
              <ChoiceCard
                title={item.title}
                key={item.title}
                onSelect={handleSelectVideoLengthType}
                form={form}
                formFieldName="videoLength"
                fontSize={10}
              />
            ))}
          />
        )}

        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Niche"
            name="niche"
            formField={
              <Input
                value={form.watch("niche")}
                onChange={(e) => form.setValue("niche", e.target.value)}
                placeholder="e.g. Video Games"
              />
            }
          />
        )}

        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Keywords"
            name="keywords"
            formField={
              <Input
                value={form.watch("keywords")}
                onChange={(e) => form.setValue("keywords", e.target.value)}
                placeholder="e.g. Fortnite, League of Legends, Call of Duty"
              />
            }
          />
        )}

        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Additional information"
            name="additionalInfo"
            formField={
              <Input
                value={form.watch("additionalInfo")}
                onChange={(e) => form.setValue("additionalInfo", e.target.value)}
                placeholder="e.g. List interesting facts about Call of Duty"
              />
            }
          />
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          {isLoading && <CustomLoader />}
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
