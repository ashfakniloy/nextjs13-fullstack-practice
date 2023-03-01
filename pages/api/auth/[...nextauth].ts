import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!response) {
          throw new Error("Incorrect Email");
        }

        if (response.password !== password) {
          throw new Error("Incorrect Password");
        }

        const user = {
          id: response.id,
          username: response.username,
          email: response.email,
        };

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    jwt: ({ token, user }) => {
      // console.log("token", token);
      if (user) {
        token.user = user;
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user = token.user as any;
      }

      // console.log("session IS", session);

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
