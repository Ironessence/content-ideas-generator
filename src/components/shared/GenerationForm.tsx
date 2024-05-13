import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import GenerationFormField from "./GenerationFormField";
import {
  instagramContentType,
  numberOfIdeas,
  platformData,
  youtubeContentType,
} from "../../utils/generationData";
import ChoiceCard from "./ChoiceCard";
import { Input } from "../ui/input";

const GenerationForm = () => {
  const formSchema = z.object({
    platform: z.string(),
    contentType: z.string(),
    numberOf: z.number(),
    niche: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      niche: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
