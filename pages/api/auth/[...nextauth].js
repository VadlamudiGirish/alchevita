import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/db/connect";
import { User } from "@/db/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ githubId: profile.id });

          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              githubId: profile.id,
            });
          }

          return true;
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
