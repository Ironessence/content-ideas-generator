import React, { FormEvent, useEffect } from "react";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import GenerationFormField from "./GenerationFormField";
import {
  instagramContentType,
  numberOfIdeas,
  platformData,
  toneType,
  youtubeContentType,
} from "../../utils/generationData";
import ChoiceCard from "./ChoiceCard";
import { Input } from "../ui/input";
import { LoaderIcon } from "lucide-react";

interface GenerationFormProps {
  onSubmit: (form: UseFormReturn<any>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const GenerationForm = ({ onSubmit, isLoading, setIsLoading }: GenerationFormProps) => {
  const formSchema = z.object({
    platform: z.string(),
    contentType: z.string(),
    numberOf: z.number(),
    toneType: z.string(),
    niche: z.string(),
    keywords: z.string(),
    additionalInfo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOf: 3,
      toneType: "None",
      niche: "",
      keywords: "",
      additionalInfo: "",
    },
  });

  const handleFormSubmit = () => {
    onSubmit(form);
  };

  const handleSelectPlatform = (platform: string) => {
    form.setValue("platform", platform);
    form.resetField("contentType");
  };

  const handleSelectContentType = (contentType: string) => {
    form.setValue("contentType", contentType);
  };

  const handleSelectNumberOfIdeas = (numberOf: number) => {
    form.setValue("numberOf", numberOf);
  };

  const handleSelectToneType = (toneType: string) => {
    form.setValue("toneType", toneType);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8 text-black"
      >
        {/* PLATFORM */}
        <GenerationFormField
          form={form}
          title="Platform"
          name="platform"
          choices={platformData.map((item) => (
            <ChoiceCard
              image={item.image}
              title={item.title}
              key={item.title}
              onSelect={handleSelectPlatform}
              form={form}
              formFieldName="platform"
            />
          ))}
        />

        {/* CONTENT TYPE */}
        {form.watch("platform") != null && (
          <GenerationFormField
            form={form}
            title="Content Type"
            name="contentType"
            choices={
              form.watch("platform") === "Instagram"
                ? instagramContentType.map((item) => (
                    <ChoiceCard
                      image={item.image}
                      title={item.title}
                      key={item.title}
                      onSelect={handleSelectContentType}
                      form={form}
                      formFieldName="contentType"
                    />
                  ))
                : youtubeContentType.map((item) => (
                    <ChoiceCard
                      image={item.image}
                      title={item.title}
                      key={item.title}
                      onSelect={handleSelectContentType}
                      form={form}
                      formFieldName="contentType"
                    />
                  ))
            }
          />
        )}

        {/* ADDITIONAL FIELDS BASED ON CONTENT TYPE */}
        {form.watch("contentType") != null && (
          <GenerationFormField
            form={form}
            title="Number of Ideas to Generate"
            name="numberOf"
            choices={numberOfIdeas.map((item) => (
              <ChoiceCard
                title={item.title}
                key={item.title}
                onSelect={handleSelectNumberOfIdeas}
                form={form}
                formFieldName="numberOf"
              />
            ))}
          />
        )}

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
        >
          {isLoading && <LoaderIcon />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
