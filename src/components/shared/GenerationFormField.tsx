import React from "react";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";

interface GenerationFormFieldProps {
  form: UseFormReturn<any>;
  title: string;
  name: string;
  choices: JSX.Element[];
}

const GenerationFormField = ({ form, title, name, choices }: GenerationFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-white">{title}</FormLabel>
          <div className="flex gap-3">
            {choices}
            {/* {Object.values(obj).map((key) => (
              <div
                key={key as Key}
                className={`flex flex-col h-[100px] w-[100px] rounded-xl border-2 border-gray-400 cursor-pointer hover:bg-slate-600 ${form.watch("platform") === key ? "bg-slate-600" : ""}`}
                onClick={() => form.setValue("platform", key)}
              >
                <Image
                  src={key === "Instagram" ? insta : yt}
                  alt="instagram"
                  priority
                  className="w-[60px] h-[60px] aspect-square self-top mx-auto mt-3"
                />
                <span className="text-white text-center text-[14px] font-semibold">
                  {key as string}
                </span>
              </div>
            ))} */}
          </div>
        </FormItem>
      )}
    />
  );
};

export default GenerationFormField;
