import z from "zod";

export const BUG_CATEGORY = [
  "UI",
  "3D_Scene",
  "Performance",
  "API",
  "Other",
] as const;
export const BUG_SEVERITY = ["Low", "Medium", "High", "Critical"] as const;

export const reportBugSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title length should be atleast 5 characters" })
    .max(50, { message: "Title length should be max 50 characters" }),

  category: z.enum(BUG_CATEGORY),

  severity: z.enum(BUG_SEVERITY),

  description: z
    .string()
    .min(20, { message: "Please provide clear details about the bug" }),
});
