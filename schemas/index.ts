import * as z from "zod";
import { UserRole } from "@/lib/generated/prisma";
import { newPassword } from "@/actions/new-password";

export const SettingSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: "Name is required" })),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({ message: "Invalid email address" })),
    password: z.optional(
      z.string().min(6, {
        message: "Password must be at least 6 characters long",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "New password must be at least 6 characters long",
      })
    ),
  })
  // could make two seperate refines for both fields to give more specific errors and to display the error effectively in the UI
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Both password and new password are required",
      path: ["password", "newPassword"],
    }
  );

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
