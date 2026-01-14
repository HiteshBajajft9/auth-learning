"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Invalid or missing token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken || existingToken.expires < new Date()) {
    return { error: "Invalid or expired token" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { email: existingUser.email },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password has been reset successfully" };
};
