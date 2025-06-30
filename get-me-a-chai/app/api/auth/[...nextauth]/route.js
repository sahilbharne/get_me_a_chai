import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "github") {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });
            await newUser.save();
          }
          return true;
        }
        return false;
      } catch (err) {
        console.error("signIn error:", err);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
          session.user.id = dbUser._id.toString();
        }
        return session;
      } catch (err) {
        console.error("session error:", err);
        return session;
      }
    },
  },
  debug: true,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
