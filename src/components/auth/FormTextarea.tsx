import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  placeholder?: string;
}

const FormTextArea = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  placeholder = "",
}: FormTextAreaProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-textarea-${name}`}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={`form-textarea-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className="min-h-30"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormTextArea;
