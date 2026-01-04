import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      id: string;
      icon?: React.ReactNode;
      className?: string;
}

interface SelectFieldProps {
      id: string;
      label: string;
      options: string[];
      className?: string;
      defaultValue?: string;
      name?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, id, icon, className = "", ...props }) => (
      <Field className={`relative ${className}`}>
            {label && (
                  <FieldLabel htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
                        {label}
                  </FieldLabel>
            )}
            <div className="relative">
                  <Input
                        id={id}
                        className={`h-auto block w-full rounded-md border-gray-300 border shadow-sm focus-visible:ring-blue-500 py-3 px-3 text-sm placeholder-gray-500 transition-colors ${
                              icon ? "pr-10" : ""
                        }`}
                        {...props}
                  />
                  {icon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                              {icon}
                        </div>
                  )}
            </div>
      </Field>
);

// Wrapper for shadcn Select to handle label and options, mimicking the original floating label style
export const SelectField: React.FC<SelectFieldProps> = ({ id, options, className = "", label, defaultValue, name }) => {
      const defaultVal = defaultValue || options[0];

      return (
            <Field className={`relative ${className}`}>
                  <FieldLabel htmlFor={id} className="absolute top-1 left-3 text-[10px] text-gray-500 z-10">
                        {label}
                  </FieldLabel>
                  <Select defaultValue={defaultVal} name={name}>
                        <SelectTrigger
                              id={id}
                              className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-9 pt-5 px-3 text-sm focus-visible:ring-blue-500 shadow-sm h-auto"
                        >
                              <SelectValue placeholder={defaultVal} />
                        </SelectTrigger>
                        <SelectContent>
                              {options.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                          {opt}
                                    </SelectItem>
                              ))}
                        </SelectContent>
                  </Select>
            </Field>
      );
};
