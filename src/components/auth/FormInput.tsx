import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ComponentProps } from "react";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: ComponentProps<"input">["type"];
  description?: string;
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({
  label,
  description,
  placeholder = "",
  name,
  type = "text",
  control,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-input-${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            value={field.value || ""}
            id={`form-input-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={type}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormInput;
