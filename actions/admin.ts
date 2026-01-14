"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/edge";

export async function admin() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "success" };
  }
  return { error: "Access denied" };
}
