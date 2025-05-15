import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/db/connect";
import { User } from "@/db/models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          await dbConnect();

          // Create or update user in database
          await User.findOneAndUpdate(
            { githubId: user.id },
            {
              githubId: user.id,
              name: user.name,
              image: user.image,
            },
            { upsert: true, new: true }
          );

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        try {
          await dbConnect();
          const user = await User.findOne({ githubId: token.sub });
          if (user) {
            session.user.id = user._id;
          }
        } catch (error) {
          console.error("Error in session callback:", error);
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
