import { z } from "zod";

export const authSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Invalid email",
      })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
  })
  .refine((data) => /[A-Z]/.test(data.password), {
    message: "Password must contain at least one uppercase letter",
    path: ["password"],
  })
  .refine((data) => /[a-z]/.test(data.password), {
    message: "Password must contain at least one lowercase letter",
    path: ["password"],
  })
  .refine((data) => /[0-9]/.test(data.password), {
    message: "Password must contain at least one number",
    path: ["password"],
  })
  .refine((data) => /[!@#$%^&.*]/.test(data.password), {
    message: "Password must contain at least one special character (!@#$.%^&*)",
    path: ["password"],
  });
