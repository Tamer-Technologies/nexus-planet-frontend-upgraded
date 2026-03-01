"use client";

import { loginFormSchema } from "@/constants/auth/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FieldGroup } from "../ui/field";
import FormInput from "./FormInput";
import { Button } from "../ui/button";

type FormValues = z.infer<typeof loginFormSchema>;

const LoginForm = ({ ...props }: ComponentProps<"form">) => {
  const form = useForm<FormValues>({ resolver: zodResolver(loginFormSchema) });

  async function handleOnSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log(data);
    // send data through api
  }

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} {...props}>
      <FieldGroup>
        <FormInput control={form.control} label="Username" name="username" />
        <FormInput
          control={form.control}
          label="Password"
          name="password"
          type="password"
        />

        <Button className="uppercase font-semibold font-barlow-condensed text-base">
          Log in
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
