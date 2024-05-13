import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import GenerationFormField from "./GenerationFormField";
import { instagramContentType, platformData, youtubeContentType } from "../../utils/generationData";
import ChoiceCard from "./ChoiceCard";

const GenerationForm = () => {
  const formSchema = z.object({
    platform: z.string(),
    contentType: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-black"
      >
        {/* PLATFORM */}
        <GenerationFormField
          form={form}
          title="Platform:"
          name="platform"
          choices={platformData.map((item) => (
            <ChoiceCard
              image={item.image}
              title={item.title}
              key={item.title}
              onSelect={handleSelectPlatform}
              form={form}
            />
          ))}
        />

        {/* CONTENT TYPE */}
        {form.watch("platform") != null && (
          <GenerationFormField
            form={form}
            title="Content Type:"
            name="contentType"
            choices={
              form.watch("platform") === "Instagram"
                ? instagramContentType.map((item) => (
                    <ChoiceCard
                      image={item.image}
                      title={item.title}
                      key={item.title}
                      onSelect={(choice) => form.setValue("contentType", choice)}
                      form={form}
                    />
                  ))
                : youtubeContentType.map((item) => (
                    <ChoiceCard
                      image={item.image}
                      title={item.title}
                      key={item.title}
                      onSelect={(choice) => form.setValue("contentType", choice)}
                      form={form}
                    />
                  ))
            }
          />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GenerationForm;
