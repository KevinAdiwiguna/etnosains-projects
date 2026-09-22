import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db/prisma";
import { Resend } from "resend";


import VerificationEmail from "@/lib/email-templates/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      const verificationUrl =
        url ||
        `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}`;
      try {
        const rensed = await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: user.email,
          subject: "Verifikasi Akun // Etnosains LMS",
          react: VerificationEmail({
            userName: user.name,
            verificationUrl,
          }),
        });
      } catch (error) {
        console.error(
          "Gagal mengirim email verifikasi via Resend:",
          error,
        );
      }
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
});
