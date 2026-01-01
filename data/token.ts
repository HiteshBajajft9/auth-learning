import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { db } from "@/lib/db";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes from now

  const existringToken = await getVerificationTokenByEmail(email);

  if (existringToken) {
    await db.verificationToken.delete({
      where: {
        id: existringToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
