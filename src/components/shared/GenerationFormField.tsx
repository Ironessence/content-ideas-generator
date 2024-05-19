import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";

interface GenerationFormFieldProps {
  form: UseFormReturn<any>;
  title: string;
  name: string;
  choices?: string[];
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
          {choices && choices.length > 0 && (
            <>
              <FormLabel className="text-white font-semibold">{title}</FormLabel>
              <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-[150px] bg-slate-600 text-white focus:text-white border-slate-600">
                      <SelectValue placeholder={form.watch(name)} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 text-white focus:text-white selection:text-white border-slate-800">
                      {choices &&
                        choices.map((choice, index) => (
                          <div key={choice}>
                            <SelectItem
                              value={choice}
                              key={choice}
                              className="bg-slate-600 focus:bg-slate-600 text-white focus:text-white selection:text-white py-3 "
                            >
                              {choice}
                            </SelectItem>
                            {index !== choices.length - 1 && (
                              <div className="w-[75%] h-[1px] bg-slate-700 ml-auto mr-auto" />
                            )}
                          </div>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </>
          )}
          {formField ?? null}
        </FormItem>
      )}
    />
  );
};

export default GenerationFormField;
