"use server";

import * as z from "zod";
import { SettingSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { send } from "process";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcrypt";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "User not found" };
  }

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingEmailUser = await getUserByEmail(values.email);
    if (existingEmailUser && existingEmailUser.id !== user.id) {
      return { error: "Email already in use" };
    }
    if (existingEmailUser && existingEmailUser.id === user.id) {
      delete values.email;
      return { error: "New email cannot be the same as the current email" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent to new email address" };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordValid = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!isPasswordValid) {
      return { error: "Current password is incorrect" };
    }
    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedNewPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings updated successfully" };
};
