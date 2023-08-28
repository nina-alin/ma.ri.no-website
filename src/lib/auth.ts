// @ts-nocheck

import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        return user
          ? {
              name: user.username,
              password: user.password,
            }
          : undefined;
      },
    }),
  ],
  secret: process.env.SECRET,
};
