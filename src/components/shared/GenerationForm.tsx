import token from "@/assets/icons/icon-coin.png";
import { constants } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { optimizeForType, toneType, videoLengthType } from "../../utils/generationData";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import GenerationFormField from "./GenerationFormField";
import CustomLoader from "./Loader/CustomLoader";

interface GenerationFormProps {
  onSubmit: (form: UseFormReturn<any>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const GenerationForm = ({ onSubmit, isLoading, setIsLoading }: GenerationFormProps) => {
  const searchParams = useSearchParams();

  const formSchema = z.object({
    toneType: z.string(),
    videoLength: z.string(),
    optimizeFor: z.string(),
    niche: z.string().min(3, { message: "Must have at least 3 characters" }),
    keywords: z.string(),
    additionalInfo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="text-black flex flex-col gap-2 w-full items-center  "
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 items-center justify-center ">
          {/* ADDITIONAL FIELDS BASED ON CONTENT TYPE */}

          {searchParams.get("type") && (
            <GenerationFormField
              form={form}
              title="Tone"
              name="toneType"
              choices={toneType.map((item) => item.title)}
            />
          )}

          {searchParams.get("type") != null && (
            <GenerationFormField
              form={form}
              title="Video Length"
              name="videoLength"
              choices={videoLengthType.map((item) => item.title)}
            />
          )}

          {searchParams.get("type") != null && (
            <GenerationFormField
              form={form}
              title="Optimize for"
              name="optimizeFor"
              choices={optimizeForType.map((item) => item.title)}
            />
          )}
        </div>

        <div>
          {searchParams.get("type") != null && (
            <GenerationFormField
              form={form}
              title="Niche"
              name="niche"
              formField={
                <>
                  <Label className="text-white">Niche</Label>
                  <Input
                    value={form.watch("niche")}
                    {...form.register("niche")}
                    placeholder="e.g. Video Games"
                    className="max-w-[350px] min-w-[300px]"
                  />
                  {form.formState.errors.niche && (
                    <p className="text-red-500 text-[14px]">
                      {form.formState.errors.niche.message}
                    </p>
                  )}
                </>
              }
            />
          )}

          {searchParams.get("type") != null && (
            <GenerationFormField
              form={form}
              title="Keywords"
              name="keywords"
              formField={
                <>
                  <Label className="text-white">Keywords</Label>
                  <Input
                    value={form.watch("keywords")}
                    {...form.register("keywords")}
                    placeholder="e.g. Fortnite, League of Legends, Call of Duty"
                    className="max-w-[350px] min-w-[300px]"
                  />
                </>
              }
            />
          )}

          {searchParams.get("type") != null && (
            <GenerationFormField
              form={form}
              title="Additional information"
              name="additionalInfo"
              formField={
                <>
                  <Label className="text-white">Additional info</Label>
                  <Textarea
                    value={form.watch("additionalInfo")}
                    {...form.register("additionalInfo")}
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
            disabled={isLoading || !form.formState.isValid}
            className="flex items-center justify-center   mt-5 bg-pink-500 hover:bg-pink-600"
          >
            {isLoading && (
              <div className="mr-2">
                <CustomLoader />
              </div>
            )}
            {isLoading ? "Generating..." : "Generate"}
            {!isLoading && (
              <Image
                src={token}
                alt="token"
                width={20}
                height={20}
                className="ml-2"
              />
            )}
            {!isLoading && <h2 className="font-bold">{constants.ideasPrice}</h2>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GenerationForm;
