import React from "react";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

interface GenerationFormFieldProps {
  form: UseFormReturn<any>;
  title: string;
  name: string;
  choices?: JSX.Element[];
  formField?: JSX.Element;
}

const GenerationFormField = ({
  form,
  title,
  name,
  choices,
  formField,
}: GenerationFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-white">{title}</FormLabel>
          <div className="flex gap-3 flex-wrap">{choices}</div>
          {formField ?? null}
        </FormItem>
      )}
    />
  );
};

export default GenerationFormField;
