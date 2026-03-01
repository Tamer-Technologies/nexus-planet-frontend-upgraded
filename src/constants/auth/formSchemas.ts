import z from "zod";

export const loginFormSchema = z.object({
  username: z
    .string("Please enter your username")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-0_]+$/, "Only letters, numbers and underscores allowed"),

  password: z
    .string("Please enter your password")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export const registerFormSchema = z.object({
  email: z.email().optional(),
  password: z
    .string("Please provide your password")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});
