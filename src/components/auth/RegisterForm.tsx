"use client";

import { registerFormSchema } from "@/constants/auth/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FieldGroup } from "../ui/field";
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import { AUTH_CONTENT } from "@/constants/auth/forms";

const registerData = AUTH_CONTENT.register;
const fieldsData = AUTH_CONTENT.fields;

type FormValues = z.infer<typeof registerFormSchema>;

const RegisterForm = ({ ...props }: ComponentProps<"form">) => {
  const form = useForm<FormValues>({
    defaultValues: { username: "", password: "", email: "" },
    resolver: zodResolver(registerFormSchema),
  });

  async function handleOnSubmit(data: z.infer<typeof registerFormSchema>) {
    console.log(data);
    // send data through api
  }

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} {...props}>
      <FieldGroup>
        <FormInput
          control={form.control}
          label={fieldsData.usernameRequired.label}
          name="username"
        />
        <FormInput
          control={form.control}
          label={fieldsData.emailOptional.label}
          name="email"
          type="email"
        />
        <FormInput
          control={form.control}
          label={fieldsData.passwordRequired.label}
          name="password"
          type="password"
        />

        <Button className="uppercase font-semibold font-barlow-condensed text-base">
          {registerData.submitButton}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
