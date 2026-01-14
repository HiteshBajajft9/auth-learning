"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // if kuch krna logout krte wakt
  await signOut();
};
