import { z } from "zod";

const plans = ["free", "pro", "premium"] as const;

export const userScheme = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long",
      })
      .max(64, {
        message: "Name must be at most 50 characters long",
      }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    weight: z.string().refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue > 0;
      },
      {
        message: "Weight must be a positive number",
      }
    ),
    plans: z.enum(plans, {
      errorMap: () => ({
        message: "Invalid plan",
      }),
    }),
    birthdate: z.string().refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date",
      }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
