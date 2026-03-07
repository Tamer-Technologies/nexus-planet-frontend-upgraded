"use client";

import FormInput from "@/components/auth/FormInput";
import FormSelect from "@/components/auth/FormSelect";
import FormTextArea from "@/components/auth/FormTextarea";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  BUG_CATEGORY,
  BUG_SEVERITY,
  reportBugSchema,
} from "@/constants/auth/reportBugSchema";
import { HOME_CONTENT } from "@/constants/marketing/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type FormValues = z.infer<typeof reportBugSchema>;

const data = HOME_CONTENT.reportBug;

const ReportBugForm = ({ ...props }: ComponentProps<"form">) => {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      category: "UI",
      severity: "Low",
      description: "",
    },
    resolver: zodResolver(reportBugSchema),
  });

  async function handleOnSubmit(data: z.infer<typeof reportBugSchema>) {
    console.log(data);
    // send data through api
  }

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)} {...props}>
      <FieldGroup>
        <FormInput
          control={form.control}
          name="title"
          label={data.inputs.title.label}
          placeholder={data.inputs.title.placeholder}
        />
        <FormSelect
          control={form.control}
          name="category"
          label={data.inputs.category.label}
          options={BUG_CATEGORY}
        />
        <FormSelect
          control={form.control}
          name="severity"
          label={data.inputs.severity.label}
          options={BUG_SEVERITY}
        />
        <FormTextArea
          control={form.control}
          name="description"
          label={data.inputs.description.label}
          placeholder={data.inputs.description.placeholder}
        />

        <Button className="uppercase font-semibold font-barlow-condensed text-base">
          {data.submitButton}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ReportBugForm;
